// src/pages/BattlePage.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useCharacter } from '../context/CharacterContext';

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
      <p>Здесь позже будет боёвка 1×1. Пока заглушка.</p>
    </div>
  );
};

export default BattlePage;
