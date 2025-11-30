// src/pages/CreateCharacterPage.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCharacter } from '../context/CharacterContext';
import type { ClassKey, Gender } from '../types/character';

import mageBaseMale from '../assets/chars/mage_base_male.png';
import mageBaseFemale from '../assets/chars/mage_base_female.png';
import mageShelterBg from '../assets/backgrounds/MAGE_SHELTER.png';

type Step = 1 | 2 | 3;

const CreateCharacterPage: React.FC = () => {
  const navigate = useNavigate();
  const { character, createCharacter, resetCharacter } = useCharacter();

  const [step, setStep] = useState<Step>(1);

  const [nickname, setNickname] = useState<string>(character?.nickname ?? '');
  const [classKey, setClassKey] = useState<ClassKey>(
    character?.class ?? 'mage',
  );
  const [gender, setGender] = useState<Gender>(character?.gender ?? 'male');
  const [skinColor, setSkinColor] = useState<string>(
    character?.skinColor ?? 'light',
  );
  const [hairStyle, setHairStyle] = useState<string>(
    character?.hairStyle ?? 'hood',
  );

  // превью
  const previewName = nickname.trim() || 'Безымянный';
  const spriteSrc = gender === 'male' ? mageBaseMale : mageBaseFemale;

  const stepTitle = step === 1 ? 'Придумай имя героя' : 'Создание персонажа';

  const stepSubtitle =
    step === 1
      ? 'Ник будет отображаться в боях и рейтингах.'
      : step === 2
      ? 'Выбери класс и пол. Это влияет на статы и стиль игры.'
      : 'Проверь ник и создай героя.';

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
      {/* фон берлоги на всю ширину экрана */}
      <div
        className="page-create__bg"
        style={{ backgroundImage: `url(${mageShelterBg})` }}
      />

      {/* контент поверх фона */}
      <div className="wizard create-shell">
        {/* заголовок шага */}
        <header className="create-header">
          <div className="wizard-step-indicator">Шаг {step} из 3</div>
          <h1 className="page-title">{stepTitle}</h1>
          <p className="page-subtitle">{stepSubtitle}</p>
        </header>

        {/* область с героем / просто фон на шаге 1 */}
        <main
          className={
            'create-main' + (step === 1 ? ' create-main--step1' : '')
          }
        >
          {(step === 2 || step === 3) && (
            <img src={spriteSrc} alt="Персонаж" className="create-hero" />
          )}
        </main>

        {/* нижняя карточка */}
        <footer className="create-footer">
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
                  className="button-primary button-primary--full"
                  onClick={handleNextFromStep1}
                >
                  Дальше
                </button>
              </div>
            </section>
          )}

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

          {step === 3 && (
            <section className="card wizard-card">
              <div className="wizard-nickname">{previewName}</div>

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
          )}
        </footer>
      </div>
    </div>
  );
};

export default CreateCharacterPage;
