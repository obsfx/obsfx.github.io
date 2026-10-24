import type { OrbSettings } from "@/src/lib/orbs/types";

export class OrbSettingsReader {
  private static readonly tokenProperties = ["--orb-anchor-x", "--orb-anchor-y", "--orb-scale"] as const;

  readonly settings: OrbSettings = { anchor: { x: 0.5, y: 0.5 }, scale: 1 };
  private readonly style: CSSStyleDeclaration;
  private lastTokens = "";

  constructor(host: HTMLElement) {
    this.style = getComputedStyle(host);
  }

  refresh(): void {
    const tokens = OrbSettingsReader.tokenProperties
      .map((property) => {
        return this.style.getPropertyValue(property);
      })
      .join("|");
    if (tokens === this.lastTokens) {
      return;
    }
    this.lastTokens = tokens;
    this.settings.anchor = {
      x: OrbSettingsReader.readNumber(this.style, "--orb-anchor-x", 0.5),
      y: OrbSettingsReader.readNumber(this.style, "--orb-anchor-y", 0.5),
    };
    this.settings.scale = OrbSettingsReader.readNumber(this.style, "--orb-scale", 1);
  }

  private static readNumber(style: CSSStyleDeclaration, property: string, fallback: number): number {
    const value = parseFloat(style.getPropertyValue(property));
    if (Number.isFinite(value)) {
      return value;
    }
    return fallback;
  }
}
