// src/pages/QuestsPage.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useCharacter } from '../context/CharacterContext';

const QuestsPage: React.FC = () => {
  const { character } = useCharacter();

  if (!character) {
    return (
      <div className="page">
        <h1>Задания и данжи</h1>
        <p>Сначала создай героя.</p>
        <Link to="/create">Создать персонажа</Link>
      </div>
    );
  }

  return (
    <div className="page">
      <h1>Задания и данжи</h1>
      <p>Тут будут дейлики и данжи. Пока заглушка.</p>
    </div>
  );
};

export default QuestsPage;
