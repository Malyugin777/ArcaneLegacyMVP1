// src/App.tsx
import React from 'react';
import { Routes, Route, Link, Navigate, useLocation } from 'react-router-dom';
import './App.css';

import { useCharacter } from './context/CharacterContext';
import CreateCharacterPage from './pages/CreateCharacterPage';
import LairPage from './pages/LairPage';
import BattlePage from './pages/BattlePage';
import QuestsPage from './pages/QuestsPage';
import TopPage from './pages/TopPage';

import mageShelterBg from './assets/backgrounds/MAGE_SHELTER.png';

const App: React.FC = () => {
  const { character } = useCharacter();
  const hasCharacter = Boolean(character);
  const location = useLocation();

  // мы сейчас на экране создания персонажа?
  const isCreatePage = location.pathname === '/create';

  // фон только для /create
  const appContentStyle = isCreatePage
    ? {
        backgroundImage: `url(${mageShelterBg})`,
        // картинка целиком по высоте окна между шапкой и навигацией
        backgroundSize: 'auto 100%',
        backgroundPosition: 'center bottom',
        backgroundRepeat: 'no-repeat',
        backgroundColor: '#020617',
      }
    : undefined;

  return (
    <div className="app">
      {/* Верхний бар с логотипом и валютой */}
      <header className="top-bar">
        <div className="top-bar__logo">Arcane Legacy MVP</div>
        <div className="top-bar__right">
          <span>🪙 {character?.coins ?? 0}</span>
          <span>⭐ {character?.stars ?? 0}</span>
        </div>
      </header>

      {/* Основной контент с роутами */}
      <main className="app-content" style={appContentStyle}>
        <Routes>
          <Route
            path="/"
            element={
              <Navigate to={hasCharacter ? '/lair' : '/create'} replace />
            }
          />

          <Route path="/create" element={<CreateCharacterPage />} />

          <Route
            path="/lair"
            element={
              hasCharacter ? <LairPage /> : <Navigate to="/create" replace />
            }
          />

          <Route path="/battle" element={<BattlePage />} />
          <Route path="/quests" element={<QuestsPage />} />
          <Route path="/top" element={<TopPage />} />

          <Route
            path="*"
            element={
              <Navigate to={hasCharacter ? '/lair' : '/create'} replace />
            }
          />
        </Routes>
      </main>

      {/* Нижнее меню навигации */}
      <nav className="bottom-nav">
        <Link to="/battle" className="bottom-nav__item">
          Бой
        </Link>
        <Link to="/lair" className="bottom-nav__item">
          Берлога
        </Link>
        <Link to="/quests" className="bottom-nav__item">
          Задания
        </Link>
        <Link to="/top" className="bottom-nav__item">
          Топ
        </Link>
      </nav>
    </div>
  );
};

export default App;
