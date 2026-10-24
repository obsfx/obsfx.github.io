import { WebGLRenderer } from "three";
import { HoloScene } from "@/src/lib/orbs/holo-scene";
import { OrbSettingsReader } from "@/src/lib/orbs/orb-settings-reader";

type Focus = [number, number, number];

export class OrbRuntime {
  private static readonly restPointer = { x: -0.55, y: 0.45 };
  private static readonly pointerEaseRate = 3;
  private static readonly focusEaseRate = 7;
  private static readonly maxFrameSeconds = 1 / 20;
  private static readonly frameIntervalMs = 1000 / 60;
  private static readonly frameToleranceMs = 2;
  private static readonly settleEpsilon = 0.001;
  private static readonly focusChannels = 3;

  private readonly host: HTMLElement;
  private readonly canvas: HTMLCanvasElement;
  private readonly renderer: WebGLRenderer;
  private readonly settingsReader: OrbSettingsReader;
  private readonly scene: HoloScene;
  private readonly reducedMotion = matchMedia("(prefers-reduced-motion: reduce)");
  private readonly frame = { time: 0, pointer: { ...OrbRuntime.restPointer }, focus: [0, 0, 0] as Focus };
  private readonly target = { pointer: { ...OrbRuntime.restPointer }, focus: [0, 0, 0] as Focus };
  private isVisible = false;
  private hasSize = false;
  private frameRequest = 0;
  private lastTimestamp = 0;

  private constructor(host: HTMLElement, canvas: HTMLCanvasElement, renderer: WebGLRenderer) {
    this.host = host;
    this.canvas = canvas;
    this.renderer = renderer;
    this.renderer.setClearColor(0x000000, 0);
    this.settingsReader = new OrbSettingsReader(host);
    this.settingsReader.refresh();
    this.scene = new HoloScene(renderer, this.settingsReader.settings);
  }

  static create(host: HTMLElement): OrbRuntime | null {
    const canvas = document.createElement("canvas");
    try {
      const renderer = new WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: "high-performance" });
      return new OrbRuntime(host, canvas, renderer);
    } catch (error) {
      console.warn("WebGL is unavailable, orb skipped", error);
      return null;
    }
  }

  start(): () => void {
    this.host.append(this.canvas);

    const resizeObserver = new ResizeObserver(([entry]) => {
      this.resize(entry.contentRect.width, entry.contentRect.height);
    });
    resizeObserver.observe(this.host);

    const intersectionObserver = new IntersectionObserver(([entry]) => {
      this.isVisible = entry.isIntersecting;
      this.requestRender();
    });
    intersectionObserver.observe(this.host);

    const listeners = new AbortController();
    this.listen(listeners.signal);

    return () => {
      cancelAnimationFrame(this.frameRequest);
      this.frameRequest = 0;
      listeners.abort();
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      this.scene.dispose();
      this.renderer.dispose();
      this.renderer.forceContextLoss();
      this.canvas.remove();
    };
  }

  private listen(signal: AbortSignal): void {
    window.addEventListener(
      "pointermove",
      (event) => {
        this.followPointer(event);
      },
      { passive: true, signal },
    );
    document.documentElement.addEventListener(
      "pointerleave",
      () => {
        this.resetPointer();
        this.setFocus(null);
      },
      { signal },
    );
    document.addEventListener(
      "pointerover",
      (event) => {
        this.setFocus(OrbRuntime.focusIndexAt(event.target));
      },
      { signal },
    );
    document.addEventListener(
      "focusin",
      (event) => {
        this.setFocus(OrbRuntime.focusIndexAt(event.target));
      },
      { signal },
    );
    document.addEventListener(
      "focusout",
      () => {
        this.setFocus(null);
      },
      { signal },
    );
    document.addEventListener(
      "visibilitychange",
      () => {
        this.requestRender();
      },
      { signal },
    );
    this.reducedMotion.addEventListener(
      "change",
      () => {
        this.resetPointer();
      },
      { signal },
    );
  }

  private readonly tick = (timestamp: number) => {
    this.frameRequest = 0;
    const elapsedMs = timestamp - this.lastTimestamp;
    if (this.lastTimestamp && elapsedMs < OrbRuntime.frameIntervalMs - OrbRuntime.frameToleranceMs) {
      this.frameRequest = requestAnimationFrame(this.tick);
      return;
    }
    let seconds = 0;
    if (this.lastTimestamp) {
      seconds = Math.min(elapsedMs / 1000, OrbRuntime.maxFrameSeconds);
    }
    this.lastTimestamp = timestamp;

    const isAnimated = !this.reducedMotion.matches;
    if (isAnimated) {
      this.frame.time += seconds;
    }
    this.advance(seconds);
    this.settingsReader.refresh();
    this.scene.render(this.frame);

    if (this.canRender() && (isAnimated || !this.isSettled())) {
      this.frameRequest = requestAnimationFrame(this.tick);
    } else {
      this.lastTimestamp = 0;
    }
  };

  private advance(seconds: number): void {
    const { frame, target } = this;
    frame.pointer.x = OrbRuntime.ease(frame.pointer.x, target.pointer.x, OrbRuntime.pointerEaseRate, seconds);
    frame.pointer.y = OrbRuntime.ease(frame.pointer.y, target.pointer.y, OrbRuntime.pointerEaseRate, seconds);
    frame.focus.forEach((value, index) => {
      frame.focus[index] = OrbRuntime.ease(value, target.focus[index], OrbRuntime.focusEaseRate, seconds);
    });
  }

  private resize(width: number, height: number): void {
    this.hasSize = width > 0 && height > 0;
    if (!this.hasSize) {
      return;
    }
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, HoloScene.maxPixelRatio));
    this.renderer.setSize(width, height, false);
    this.scene.resize(width, height);
    this.requestRender();
  }

  private followPointer(event: PointerEvent): void {
    if (this.reducedMotion.matches) {
      return;
    }
    const rect = this.host.getBoundingClientRect();
    if (!rect.height) {
      return;
    }
    const { anchor, scale } = this.settingsReader.settings;
    const unit = Math.min(rect.width, rect.height) * scale;
    this.target.pointer.x = (event.clientX - rect.left - anchor.x * rect.width) / unit;
    this.target.pointer.y = (rect.top + anchor.y * rect.height - event.clientY) / unit;
    this.requestRender();
  }

  private setFocus(index: number | null): void {
    this.target.focus.fill(0);
    if (index !== null && index < this.target.focus.length) {
      this.target.focus[index] = 1;
    }
    this.requestRender();
  }

  private resetPointer(): void {
    Object.assign(this.target.pointer, OrbRuntime.restPointer);
    this.requestRender();
  }

  private requestRender(): void {
    if (!this.frameRequest && this.canRender()) {
      this.frameRequest = requestAnimationFrame(this.tick);
    }
  }

  private canRender(): boolean {
    return this.isVisible && this.hasSize && document.visibilityState === "visible";
  }

  private isSettled(): boolean {
    const { frame, target } = this;
    const pointerDistance = Math.abs(frame.pointer.x - target.pointer.x) + Math.abs(frame.pointer.y - target.pointer.y);
    if (pointerDistance >= OrbRuntime.settleEpsilon) {
      return false;
    }
    return frame.focus.every((value, index) => {
      return Math.abs(value - target.focus[index]) < OrbRuntime.settleEpsilon;
    });
  }

  private static ease(current: number, target: number, rate: number, seconds: number): number {
    return current + (target - current) * (1 - Math.exp(-rate * seconds));
  }

  private static focusIndexAt(target: EventTarget | null): number | null {
    if (!(target instanceof Element)) {
      return null;
    }
    const element = target.closest<HTMLElement>("[data-orb-focus], a[href]");
    if (!element) {
      return null;
    }
    const pinned = Number(element.dataset.orbFocus);
    if (element.dataset.orbFocus !== undefined && Number.isInteger(pinned)) {
      return pinned;
    }
    return Array.from(document.querySelectorAll("a[href]")).indexOf(element) % OrbRuntime.focusChannels;
  }
}
