// src/pages/TopPage.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useCharacter } from '../context/CharacterContext';

const TopPage: React.FC = () => {
  const { character } = useCharacter();

  return (
    <div className="page">
      <h1>Топ / Олимпиада</h1>
      {character ? (
        <p>Тут будет рейтинг и Олимпиада. Пока заглушка.</p>
      ) : (
        <>
          <p>Сначала создай героя, потом ворвёмся в топ.</p>
          <Link to="/create">Создать персонажа</Link>
        </>
      )}
    </div>
  );
};

export default TopPage;
