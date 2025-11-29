// src/pages/CreateCharacterPage.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCharacter } from '../context/CharacterContext';
import type { ClassKey, Gender } from '../types/character';

import mageBaseMale from '../assets/chars/mage_base_male.png';
import mageBaseFemale from '../assets/chars/mage_base_female.png';

type Step = 1 | 2 | 3;

// Текстовые лейблы
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

const CreateCharacterPage: React.FC = () => {
  const navigate = useNavigate();
  const { character, createCharacter, resetCharacter } = useCharacter();

  // -------- состояние мастера --------
  const [step, setStep] = useState<Step>(1);

  const [nickname, setNickname] = useState<string>(character?.nickname ?? '');
  const [classKey, setClassKey] = useState<ClassKey>(character?.class ?? 'mage');
  const [gender, setGender] = useState<Gender>(character?.gender ?? 'male');
  const [skinColor, setSkinColor] = useState<string>(character?.skinColor ?? 'light');
  const [hairStyle, setHairStyle] = useState<string>(character?.hairStyle ?? 'hood');

  // -------- превью --------
  const previewName = nickname.trim() || 'Безымянный';
  const previewClass = CLASS_LABELS[classKey];
  const previewGender = GENDER_LABELS[gender];
  const spriteSrc = gender === 'male' ? mageBaseMale : mageBaseFemale;

  const stepTitle =
    step === 1 ? 'Придумай имя героя' : 'Создание персонажа';

  const stepSubtitle =
    step === 1
      ? 'Ник будет отображаться в боях и рейтингах.'
      : step === 2
      ? 'Выбери класс и пол. Это влияет на статы и стиль игры.'
      : 'Подбери внешность. Это не меняет статы, только визуал.';

  // -------- переходы по шагам --------
  const goToStep = (target: Step) => setStep(target);

  const handleNextFromStep1 = () => {
    if (!nickname.trim()) {
      alert('Введи никнейм героя');
      return;
    }
    goToStep(2);
  };

  const handleNextFromStep2 = () => {
    goToStep(3);
  };

  const handleBack = () => {
    setStep((prev) => (prev > 1 ? ((prev - 1) as Step) : 1));
  };

  const handleFinish = () => {
    if (!nickname.trim()) {
      alert('Введи никнейм героя');
      return;
    }

    createCharacter({
      nickname: nickname.trim(),
      classKey,
      gender,
      skinColor,
      hairStyle,
    });

    navigate('/lair');
  };

  const handleReset = () => {
    if (window.confirm('Удалить текущего героя и создать нового?')) {
      resetCharacter();
      setNickname('');
      setClassKey('mage');
      setGender('male');
      setSkinColor('light');
      setHairStyle('hood');
      setStep(1);
    }
  };

  return (
    <div className="page page-create">
      <div className="wizard">
        {/* Заголовок мастера */}
        <div className="wizard-title-block">
          <div className="wizard-step-indicator">Шаг {step} из 3</div>
          <h1 className="page-title">{stepTitle}</h1>
          <p className="page-subtitle">{stepSubtitle}</p>
        </div>

        {/* Персонаж на фоне — только для шагов 2 и 3 */}
        {(step === 2 || step === 3) && (
          <div className="create-preview__hero">
            <img
              src={spriteSrc}
              alt="Персонаж"
              className="create-preview__hero-img"
            />
          </div>
        )}

        {/* Шаг 1: Никнейм */}
        {step === 1 && (
          <section className="card wizard-card">
            <h2 className="section-title">Имя героя</h2>
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

            <div className="wizard-buttons">
              <button
                type="button"
                className="button-primary"
                onClick={handleNextFromStep1}
              >
                Дальше
              </button>
            </div>
          </section>
        )}

        {/* Шаг 2: Класс и пол */}
        {step === 2 && (
          <section className="card wizard-card">
            <h2 className="section-title">Класс и пол</h2>

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

            <div className="wizard-buttons">
              <button
                type="button"
                className="link-button"
                onClick={handleBack}
              >
                Назад
              </button>
              <button
                type="button"
                className="button-primary"
                onClick={handleNextFromStep2}
              >
                Дальше
              </button>
            </div>
          </section>
        )}

        {/* Шаг 3: Внешность + финал */}
        {step === 3 && (
          <>
            {/* Карточка с информацией о герое */}
            <section className="card hero-info-card">
              <h2 className="section-title">Твой герой</h2>
              <div className="hero-card__name">{previewName}</div>
              <div className="hero-card__meta">
                {previewClass} · {previewGender}
              </div>
              <div className="hero-card__hint">
                Базовая одежда — позже сюда «наденем» шмот и оружие.
              </div>
            </section>

            {/* Карточка выбора внешности */}
            <section className="card wizard-card">
              <h2 className="section-title">Внешность</h2>

              <div className="form-row-inline">
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

              <div className="wizard-buttons">
                <button
                  type="button"
                  className="link-button"
                  onClick={handleBack}
                >
                  Назад
                </button>
                <button
                  type="button"
                  className="button-primary"
                  onClick={handleFinish}
                >
                  Создать героя
                </button>
              </div>

              {character && (
                <button
                  type="button"
                  className="link-button create-reset-button"
                  onClick={handleReset}
                >
                  Сбросить текущего героя
                </button>
              )}
            </section>
          </>
        )}
      </div>
    </div>
  );
};

export default CreateCharacterPage;
