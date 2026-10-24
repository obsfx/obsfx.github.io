export interface OrbSettings {
  anchor: { x: number; y: number };
  scale: number;
}

export interface OrbFrame {
  time: number;
  pointer: { x: number; y: number };
  focus: readonly [number, number, number];
}

export interface OrbScene {
  resize(width: number, height: number): void;
  render(frame: OrbFrame): void;
  dispose(): void;
}
