export abstract class TooltipBounds {
  private static readonly marginPx = 12;

  static start(): () => void {
    const listeners = new AbortController();
    ["pointerover", "focusin"].forEach((type) => {
      document.addEventListener(
        type,
        (event) => {
          TooltipBounds.fit(event.target);
        },
        { signal: listeners.signal },
      );
    });
    return () => {
      listeners.abort();
    };
  }

  private static fit(target: EventTarget | null): void {
    if (!(target instanceof Element)) {
      return;
    }
    const trigger = target.closest<HTMLElement>("[aria-describedby]");
    const tooltip = document.getElementById(trigger?.getAttribute("aria-describedby") ?? "");
    if (!trigger || tooltip?.getAttribute("role") !== "tooltip") {
      return;
    }
    const { left, right } = trigger.getBoundingClientRect();
    const naturalLeft = (left + right - tooltip.offsetWidth) / 2;
    const naturalRight = naturalLeft + tooltip.offsetWidth;
    const limit = document.documentElement.clientWidth - TooltipBounds.marginPx;
    const shift = Math.max(TooltipBounds.marginPx - naturalLeft, 0) - Math.max(naturalRight - limit, 0);
    tooltip.style.setProperty("--tooltip-shift", `${shift}px`);
  }
}
