// src/game/PvpTest.tsx
import React, { useState } from "react";
import { MageSprite } from "./magesprite";
import { playAnimOnce } from "./animHelpers";
import type { AnimName } from "./spriteConfig";

export const PvpTest: React.FC = () => {
  const [anim, setAnim] = useState<AnimName>("idle");

  const play = (name: AnimName, stay?: AnimName) => {
    playAnimOnce(name, setAnim, stay ?? "idle");
  };

  return (
    <div className="pvp-test">
      <div className="pvp-test__sprite">
        <MageSprite anim={anim} scale={2.2} />
      </div>

      <div className="pvp-test__controls">
        <button onClick={() => play("primaryCast")}>Primary</button>
        <button onClick={() => play("bigCast")}>Big</button>
        <button onClick={() => play("heal")}>Heal</button>
        <button onClick={() => play("buff")}>Buff</button>
        <button onClick={() => play("dash")}>Dash</button>
        <button onClick={() => play("takeHit")}>Hit</button>
        <button onClick={() => play("death", "death")}>Death</button>
        <button onClick={() => setAnim("victory")}>Victory</button>
        <button onClick={() => setAnim("idle")}>Idle</button>
      </div>
    </div>
  );
};
