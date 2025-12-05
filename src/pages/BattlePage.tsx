// src/pages/BattlePage.tsx
import React from "react";
import { Link } from "react-router-dom";
import { useCharacter } from "../context/CharacterContext";
import { PvpTest } from "../game/PvpTest";

const BattlePage: React.FC = () => {
  const { character } = useCharacter();

  if (!character) {
    return (
      <div className="page">
        <h1>Быстрые бои</h1>
        <p>Сначала создай героя.</p>
        <Link to="/create">Создать персонажа</Link>
      </div>
    );
  }

  return (
    <div className="page">
      <h1>Быстрые бои</h1>

      {/* тут наш тестовый PVP с магом и кнопками */}
      <PvpTest />
    </div>
  );
};

export default BattlePage;
