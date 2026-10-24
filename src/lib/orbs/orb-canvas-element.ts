export class OrbCanvasElement extends HTMLElement {
  private static readonly elementName = "orb-canvas";

  private stop: (() => void) | null = null;
  private readonly sizeObserver = new ResizeObserver(([entry]) => {
    const { width, height } = entry.contentRect;
    if (width > 0 && height > 0 && !this.stop) {
      this.mount();
    }
  });

  static register(): void {
    if (!customElements.get(OrbCanvasElement.elementName)) {
      customElements.define(OrbCanvasElement.elementName, OrbCanvasElement);
    }
  }

  connectedCallback(): void {
    this.sizeObserver.observe(this);
  }

  disconnectedCallback(): void {
    this.sizeObserver.disconnect();
    this.stop?.();
    this.stop = null;
  }

  private mount(): void {
    let isStopped = false;
    let stopRuntime: (() => void) | null = null;
    this.stop = () => {
      isStopped = true;
      stopRuntime?.();
    };
    import("@/src/lib/orbs/orb-runtime").then(({ OrbRuntime }) => {
      if (isStopped) {
        return;
      }
      stopRuntime = OrbRuntime.create(this)?.start() ?? null;
    });
  }
}
