// src/pages/LairPage.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useCharacter } from '../context/CharacterContext';
import type { ClassKey, Gender } from '../types/character';
import { getXpToNextLevel } from '../types/character';

// Локальные подписи классов и пола — только для этой страницы
const CLASS_LABELS: Record<ClassKey, string> = {
  mage: 'Маг',
  archer: 'Лучник',
  knight: 'Рыцарь',
  dagger: 'Даггерщик',
};

const GENDER_LABELS: Record<Gender, string> = {
  male: 'Мужской',
  female: 'Женский',
};

const LairPage: React.FC = () => {
  const { character } = useCharacter();

  // Если героя ещё нет — показываем заглушку
  if (!character) {
    return (
      <div className="page">
        <h1>Берлога</h1>
        <p>Сначала создай персонажа.</p>
        <Link to="/create">Перейти к созданию</Link>
      </div>
    );
  }

  const xpToNext = getXpToNextLevel(character.level);
  const hpPercent = (character.stats.currentHp / character.stats.maxHp) * 100;
  const xpPercent = Math.min(100, (character.xp / xpToNext) * 100);

  const classLabel = CLASS_LABELS[character.class];
  const genderLabel = GENDER_LABELS[character.gender];

  const spriteEmoji =
    character.class === 'mage'
      ? '🧙‍♂️'
      : character.class === 'archer'
      ? '🏹'
      : character.class === 'knight'
      ? '🛡️'
      : '🗡️';

  return (
    <div className="page">
      <h1>Берлога</h1>

      <div className="card lair-card">
        <div className="lair-main">
          <div className="hero-sprite">{spriteEmoji}</div>

          <div className="hero-info">
            <div className="hero-name">{character.nickname}</div>
            <div className="hero-sub">
              {classLabel} · Lv.{character.level} · {genderLabel}
            </div>

            <div className="bars">
              <div className="bar-label">
                HP {character.stats.currentHp}/{character.stats.maxHp}
              </div>
              <div className="bar-track">
                <div
                  className="bar-fill bar-fill-hp"
                  style={{ width: `${hpPercent}%` }}
                />
              </div>

              <div className="bar-label">
                XP {character.xp}/{xpToNext}
              </div>
              <div className="bar-track">
                <div
                  className="bar-fill bar-fill-xp"
                  style={{ width: `${xpPercent}%` }}
                />
              </div>
            </div>
          </div>

          <button className="inventory-button" type="button">
            Инвентарь
          </button>
        </div>

        <div className="lair-stats">
          <h2>Статы</h2>
          <ul className="stats-list">
            <li>HP: {character.stats.maxHp}</li>
            <li>
              Урон: {character.stats.damageMin}–{character.stats.damageMax}
            </li>
            <li>Шанс крита: {Math.round(character.stats.critChance * 100)}%</li>
            <li>Сила крита: ×{character.stats.critPower}</li>
            <li>Уворот: {Math.round(character.stats.dodgeChance * 100)}%</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default LairPage;
