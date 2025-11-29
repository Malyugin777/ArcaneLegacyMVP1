// src/types/character.ts

// Класс и пол героя
export type ClassKey = 'mage' | 'archer' | 'knight' | 'dagger';
export type Gender = 'male' | 'female';

// Боевая статистика
export interface HeroStats {
  level: number;        // 1..20
  currentHp: number;
  maxHp: number;
  damageMin: number;
  damageMax: number;
  critChance: number;   // 0..1
  critPower: number;    // множитель крита
  dodgeChance: number;  // 0..1
}

// Полная модель персонажа на фронте
export interface Character {
  id: number;
  nickname: string;
  class: ClassKey;
  gender: Gender;
  skinColor: string;
  hairStyle: string;
  level: number;
  xp: number;
  coins: number;
  stars: number;
  lairSkinId: string;
  stats: HeroStats;
}

// Базовые статы для 1 уровня по классам
export function createBaseStats(classKey: ClassKey): HeroStats {
  switch (classKey) {
    case 'mage':
      return {
        level: 1,
        currentHp: 80,
        maxHp: 80,
        damageMin: 10,
        damageMax: 16,
        critChance: 0.2,
        critPower: 2.0,
        dodgeChance: 0.05,
      };
    case 'archer':
      return {
        level: 1,
        currentHp: 90,
        maxHp: 90,
        damageMin: 9,
        damageMax: 15,
        critChance: 0.18,
        critPower: 2.0,
        dodgeChance: 0.12,
      };
    case 'knight':
      return {
        level: 1,
        currentHp: 120,
        maxHp: 120,
        damageMin: 8,
        damageMax: 13,
        critChance: 0.12,
        critPower: 1.8,
        dodgeChance: 0.05,
      };
    case 'dagger':
      return {
        level: 1,
        currentHp: 85,
        maxHp: 85,
        damageMin: 11,
        damageMax: 18,
        critChance: 0.25,
        critPower: 2.2,
        dodgeChance: 0.1,
      };
    default:
      return {
        level: 1,
        currentHp: 100,
        maxHp: 100,
        damageMin: 8,
        damageMax: 14,
        critChance: 0.15,
        critPower: 2.0,
        dodgeChance: 0.08,
      };
  }
}

// Простая кривая XP: к 20 лвл нужно всё больше опыта
export function getXpToNextLevel(level: number): number {
  if (level >= 20) return 0; // MAX
  return 100 + (level - 1) * 30; // 100, 130, 160, ...
}
