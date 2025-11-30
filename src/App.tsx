// src/App.tsx
import React from 'react';
import {
  Routes,
  Route,
  Navigate,
  useLocation,
  useNavigate,
} from 'react-router-dom';

import { useCharacter } from './context/CharacterContext';

import CreateCharacterPage from './pages/CreateCharacterPage';
import LairPage from './pages/LairPage';
import BattlePage from './pages/BattlePage';
import QuestsPage from './pages/QuestsPage';
import TopPage from './pages/TopPage';

import './App.css';

const App: React.FC = () => {
  const location = useLocation();
  const { character } = useCharacter();

  const hasCharacter = Boolean(character);
  const isCreateRoute = location.pathname === '/create';

  return (
    <div className="app-root">
      {/* верхняя панель игры */}
      <header className="top-bar">
        <div className="top-bar__logo">Arcane Legacy MVP</div>
        <div className="top-bar__currencies">
          <div className="currency-pill">
            <span className="currency-pill__icon">🪙</span>
            <span className="currency-pill__value">0</span>
          </div>
          <div className="currency-pill">
            <span className="currency-pill__icon">⭐</span>
            <span className="currency-pill__value">0</span>
          </div>
        </div>
      </header>

      {/* основной контент страниц */}
      <main className="app-content">
        <Routes>
          {/* мастер создания героя */}
          <Route path="/create" element={<CreateCharacterPage />} />

          {/* остальная игра — только после создания героя */}
          <Route
            path="/lair"
            element={hasCharacter ? <LairPage /> : <Navigate to="/create" replace />}
          />
          <Route
            path="/battle"
            element={hasCharacter ? <BattlePage /> : <Navigate to="/create" replace />}
          />
          <Route
            path="/quests"
            element={hasCharacter ? <QuestsPage /> : <Navigate to="/create" replace />}
          />
          <Route path="/top" element={<TopPage />} />

          {/* дефолт: если герой есть — в берлогу, если нет — в создание */}
          <Route
            path="*"
            element={
              hasCharacter ? (
                <Navigate to="/lair" replace />
              ) : (
                <Navigate to="/create" replace />
              )
            }
          />
        </Routes>
      </main>

      {/* нижнее меню — нет на /create, есть везде после создания героя */}
      {hasCharacter && !isCreateRoute && <BottomNav />}
    </div>
  );
};

const BottomNav: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const items = [
    { path: '/battle', label: 'Бой' },
    { path: '/lair', label: 'Берлога' },
    { path: '/quests', label: 'Задания' },
    { path: '/top', label: 'Топ' },
  ];

  return (
    <nav className="bottom-nav">
      {items.map((item) => {
        const isActive = location.pathname === item.path;

        return (
          <button
            key={item.path}
            type="button"
            className={
              'bottom-nav__item' +
              (isActive ? ' bottom-nav__item--active' : '')
            }
            onClick={() => navigate(item.path)}
          >
            {item.label}
          </button>
        );
      })}
    </nav>
  );
};

export default App;
