// src/pages/CreateCharacterPage.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCharacter } from '../context/CharacterContext';
import type { ClassKey, Gender } from '../types/character';

export const CreateCharacterPage: React.FC = () => {
  const navigate = useNavigate();
  const { character, createCharacter, resetCharacter } = useCharacter();

  const [nickname, setNickname] = useState(character?.nickname ?? '');
  const [classKey, setClassKey] = useState<ClassKey>(character?.class ?? 'mage');
  const [gender, setGender] = useState<Gender>(character?.gender ?? 'male');
  const [skinColor, setSkinColor] = useState<string>(character?.skinColor ?? 'light');
  const [hairStyle, setHairStyle] = useState<string>(character?.hairStyle ?? 'hood');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!nickname.trim()) {
      alert('Введи никнейм героя');
      return;
    }

    createCharacter({ nickname, classKey, gender, skinColor, hairStyle });
    navigate('/lair');
  };

  const handleReset = () => {
    if (window.confirm('Удалить текущего героя и создать нового?')) {
      resetCharacter();
      setNickname('');
    }
  };

  return (
    <div className="page">
      <h1>Создание персонажа</h1>
      <p>Выбери класс, пол и внешний вид героя.</p>

      <form className="card" onSubmit={handleSubmit}>
        <div className="form-row">
          <label className="form-label">
            Никнейм
            <input
              className="form-input"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              placeholder="Например, NightHowler"
            />
          </label>
        </div>

        <div className="form-row">
          <label className="form-label">
            Класс
            <select
              className="form-select"
              value={classKey}
              onChange={(e) => setClassKey(e.target.value as ClassKey)}
            >
              <option value="mage">Маг — урон и крит</option>
              <option value="archer">Лучник — криты и уворот</option>
              <option value="knight">Рыцарь — много HP</option>
              <option value="dagger">Даггерщик — высокий крит</option>
            </select>
          </label>
        </div>

        <div className="form-row">
          <label className="form-label">
            Пол
            <select
              className="form-select"
              value={gender}
              onChange={(e) => setGender(e.target.value as Gender)}
            >
              <option value="male">Мужской</option>
              <option value="female">Женский</option>
            </select>
          </label>
        </div>

        <div className="form-row form-row-inline">
          <label className="form-label">
            Цвет кожи
            <select
              className="form-select"
              value={skinColor}
              onChange={(e) => setSkinColor(e.target.value)}
            >
              <option value="light">Светлая</option>
              <option value="tan">Смуглая</option>
              <option value="dark">Тёмная</option>
            </select>
          </label>

          <label className="form-label">
            Прическа / капюшон
            <select
              className="form-select"
              value={hairStyle}
              onChange={(e) => setHairStyle(e.target.value)}
            >
              <option value="hood">Капюшон</option>
              <option value="short">Короткие</option>
              <option value="long">Длинные</option>
              <option value="braids">Косы</option>
            </select>
          </label>
        </div>

        <button type="submit" className="button-primary">
          Создать героя
        </button>
      </form>

      {character && (
        <button type="button" className="link-button" onClick={handleReset}>
          Сбросить текущего героя
        </button>
      )}
    </div>
  );
};
export default CreateCharacterPage;
