// src/context/CharacterContext.tsx
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

import type { Character, ClassKey, Gender } from '../types/character';
import { createBaseStats } from '../types/character';

const LOCAL_STORAGE_KEY = 'arcaneLegacy.character';

interface CreateCharacterPayload {
  nickname: string;
  classKey: ClassKey;
  gender: Gender;
  skinColor: string;
  hairStyle: string;
}

interface CharacterContextValue {
  character: Character | null;
  createCharacter: (payload: CreateCharacterPayload) => void;
  resetCharacter: () => void;
}

const CharacterContext = createContext<CharacterContextValue | undefined>(
  undefined,
);

export const CharacterProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [character, setCharacter] = useState<Character | null>(null);

  // 1) старт: читаем героя из localStorage
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(LOCAL_STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as Character;
        setCharacter(parsed);
      }
    } catch (error) {
      console.error('Не получилось прочитать персонажа из localStorage', error);
      window.localStorage.removeItem(LOCAL_STORAGE_KEY);
    }
  }, []);

  // 2) при изменении героя — сохраняем в localStorage
  useEffect(() => {
    try {
      if (character) {
        window.localStorage.setItem(
          LOCAL_STORAGE_KEY,
          JSON.stringify(character),
        );
      }
    } catch (error) {
      console.error('Не получилось сохранить персонажа в localStorage', error);
    }
  }, [character]);

  // 3) создание героя
  const createCharacter = (payload: CreateCharacterPayload) => {
    const newCharacter: Character = {
      id: Date.now(),
      nickname: payload.nickname.trim() || 'Безымянный',
      class: payload.classKey,
      gender: payload.gender,
      skinColor: payload.skinColor,
      hairStyle: payload.hairStyle,
      level: 1,
      xp: 0,
      coins: 0,
      stars: 0,
      lairSkinId: 'default_root',
      stats: createBaseStats(payload.classKey),
    };

    setCharacter(newCharacter);
  };

  // 4) сброс героя (новый аккаунт)
  const resetCharacter = () => {
    setCharacter(null);
    try {
      window.localStorage.removeItem(LOCAL_STORAGE_KEY);
    } catch (error) {
      console.error(error);
    }
  };

  const value: CharacterContextValue = {
    character,
    createCharacter,
    resetCharacter,
  };

  return (
    <CharacterContext.Provider value={value}>
      {children}
    </CharacterContext.Provider>
  );
};

export const useCharacter = (): CharacterContextValue => {
  const ctx = useContext(CharacterContext);
  if (!ctx) {
    throw new Error('useCharacter должен вызываться внутри CharacterProvider');
  }
  return ctx;
};
