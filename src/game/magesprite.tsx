// src/game/MageSprite.tsx
import React, { useEffect, useState } from "react";
import mageSheet from "../assets/mage/mage-spritesheet.png";
import { SPRITE_CONFIG, FRAME_WIDTH, FRAME_HEIGHT } from "./spriteConfig";
import type { AnimName } from "./spriteConfig";

type MageSpriteProps = {
  anim: AnimName;
  scale?: number; // во сколько раз увеличивать спрайт (2–4 обычно ок)
};

export const MageSprite: React.FC<MageSpriteProps> = ({ anim, scale = 3 }) => {
  const cfg = SPRITE_CONFIG[anim];
  const [frame, setFrame] = useState(0);

  useEffect(() => {
    // при смене анимации стартуем с нулевого кадра
    setFrame(0);

    const { frames, fps, loop } = cfg;
    const frameDuration = 1000 / fps;
    let current = 0;

    const id = window.setInterval(() => {
      current += 1;

      if (current >= frames) {
        if (loop) {
          current = 0;
        } else {
          current = frames - 1;
          window.clearInterval(id);
        }
      }

      setFrame(current);
    }, frameDuration);

    return () => {
      window.clearInterval(id);
    };
  }, [anim, cfg]);

  const width = FRAME_WIDTH * scale;
  const height = FRAME_HEIGHT * scale;

  const offsetX = -frame * FRAME_WIDTH;
  const offsetY = -cfg.row * FRAME_HEIGHT;

  return (
    <div
      style={{
        width,
        height,
        imageRendering: "pixelated",
        backgroundImage: `url(${mageSheet})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: `${offsetX}px ${offsetY}px`,
      }}
    />
  );
};
