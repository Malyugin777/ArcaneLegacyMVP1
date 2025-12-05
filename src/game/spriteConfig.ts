// src/game/spriteConfig.ts (или src/spriteConfig.ts)

export type AnimName =
  | "idle"
  | "walk"
  | "run"
  | "primaryCast"
  | "bigCast"
  | "block"
  | "takeHit"
  | "death"
  | "heal"
  | "buff"
  | "pickup"
  | "jump"
  | "dash"
  | "victory";

// ✅ реальные размеры кадра для этого спрайта
export const FRAME_WIDTH = 64;
export const FRAME_HEIGHT = 64;

// row — номер строки сверху вниз (0 — Idle, 1 — Walk и т.д.)
export const SPRITE_CONFIG: Record<
  AnimName,
  { row: number; frames: number; fps: number; loop: boolean }
> = {
  idle:        { row: 0,  frames: 4, fps: 6,  loop: true },
  walk:        { row: 1,  frames: 6, fps: 8,  loop: true },
  run:         { row: 2,  frames: 6, fps: 10, loop: true },
  primaryCast: { row: 3,  frames: 6, fps: 10, loop: false },
  bigCast:     { row: 4,  frames: 6, fps: 10, loop: false },
  block:       { row: 5,  frames: 4, fps: 10, loop: false },
  takeHit:     { row: 6,  frames: 4, fps: 12, loop: false },
  death:       { row: 7,  frames: 6, fps: 8,  loop: false },
  heal:        { row: 8,  frames: 6, fps: 10, loop: false },
  buff:        { row: 9,  frames: 6, fps: 10, loop: false },
  pickup:      { row: 10, frames: 4, fps: 8,  loop: false },
  jump:        { row: 11, frames: 6, fps: 12, loop: false },
  dash:        { row: 12, frames: 6, fps: 14, loop: false },
  victory:     { row: 13, frames: 3, fps: 6,  loop: true },
  // 14-я (15-я) строка, если она пустая в файле, нас не волнует
};
