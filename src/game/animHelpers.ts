// src/game/animHelpers.ts
import { SPRITE_CONFIG } from "./spriteConfig";
import type { AnimName } from "./spriteConfig";

/**
 * Проигрывает анимацию один раз и затем переключает на next (по умолчанию 'idle')
 */
export function playAnimOnce(
  name: AnimName,
  setAnim: (a: AnimName) => void,
  next: AnimName = "idle"
) {
  const cfg = SPRITE_CONFIG[name];
  const duration = (cfg.frames / cfg.fps) * 1000;

  setAnim(name);

  window.setTimeout(() => {
    setAnim(next);
  }, duration);
}
