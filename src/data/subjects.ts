import { WorkType, Subject } from '@/data/mock/Subject';

export const subjects: Subject[] = [
  // ───────────── 1-й семестр ─────────────
  {
    subjectId: 'cl1',
    name: "Комп'ютерна Логіка. Частина 1",
    semester: 1,
    works: [
      { type: WorkType.LAB, numbers: [1, 2, 3, 4, 5], priceMin: 450, priceMax: 500 },
      { type: WorkType.COLLOQUIUM, numbers: [1, 2, 3, 4, 5], priceMin: 350, priceMax: 400 },
      { type: WorkType.DKR, priceMin: 700, priceMax: 800 },
    ],
  },
  {
    subjectId: 'prog1',
    name: 'Програмування. Частина 1',
    semester: 1,
    works: [
      { type: WorkType.LAB, numbers: [1, 2, 3, 4, 5, 6, 7], priceMin: 250, priceMax: 300 },
      { type: WorkType.ADDITIONAL_LAB, numbers: [8], priceMin: 400 },
    ],
  },
  {
    subjectId: 'sda',
    name: 'Структури даних та алгоритми',
    semester: 1,
    works: [{ type: WorkType.LAB, numbers: [1.1, 1.2, 1.5, 1.6, 2.1, 2.2], priceMin: null }],
  },

  // ───────────── 2-й семестр ─────────────
  {
    subjectId: 'cl2',
    name: "Комп'ютерна Логіка. Частина 2",
    semester: 2,
    works: [
      { type: WorkType.LAB, numbers: [1, 2, 3, 4, 5], priceMin: 400, priceMax: 450 },
      { type: WorkType.COLLOQUIUM, numbers: [1, 2, 3, 4, 5], priceMin: 350, priceMax: 400 },
      { type: WorkType.COURSEWORK, priceMin: 2800, priceMax: 3100 },
    ],
  },
  {
    subjectId: 'prog2',
    name: 'Програмування. Частина 2',
    semester: 2,
    works: [{ type: WorkType.LAB, numbers: [1, 2, 3, 4, 5], priceMin: 300, priceMax: 350 }],
  },
  {
    subjectId: 'dm',
    name: 'Дискретна математика',
    semester: 2,
    works: [
      { type: WorkType.LAB, numbers: [1, 2, 3, 4], priceMin: 400, priceMax: 450 },
      { type: WorkType.ADDITIONAL_LAB, numbers: [5], priceMin: 600 },
    ],
  },

  // ───────────── 3-й семестр ─────────────
  {
    subjectId: 'ce',
    name: 'Практична Електроніка',
    semester: 3,
    works: [
      { type: WorkType.LAB, numbers: [1, 2, 3, 4, 5, 6, 7, 8, 9], priceMin: 450, priceMax: 500 },
    ],
  },
  {
    subjectId: 'se',
    name: 'Інженерія програмного забезпечення',
    semester: 3,
    works: [
      { type: WorkType.LAB, numbers: [1, 2, 3, 4, 5, 6, 7, 8], priceMin: 360, priceMax: 400 },
      { type: WorkType.ADDITIONAL_LAB, numbers: [9], priceMin: 700 },
    ],
  },
  {
    subjectId: 'tecs',
    name: 'Теорія електричних кіл та сигналів',
    semester: 3,
    works: [
      { type: WorkType.LAB, numbers: [1, 2, 3, 4, 5, 6, 7, 8], priceMin: 300, priceMax: 350 },
    ],
  },
  {
    subjectId: 'linux',
    name: 'Вступ до операційної системи Linux',
    semester: 3,
    works: [
      { type: WorkType.LAB, numbers: [1, 2, 3, 4, 5, 6, 7, 8, 9], priceMin: 300, priceMax: 350 },
      { type: WorkType.COURSEWORK, priceMin: 2200, priceMax: 2500 },
    ],
  },

  // ───────────── 4-й семестр ─────────────
  {
    subjectId: 'se4_coursework',
    name: 'Інженерія програмного забезпечення',
    semester: 4,
    works: [
      { type: WorkType.COURSEWORK, variant: 'без звіту', priceMin: 2500, priceMax: 2800 },
      { type: WorkType.COURSEWORK, variant: 'зі звітом + відео', priceMin: 4000, priceMax: 4200 },
    ],
  },
  {
    subjectId: 'ac1',
    name: "Архітектура комп'ютерів. Частина 1",
    semester: 4,
    works: [
      { type: WorkType.LAB, numbers: [1, 2, 3, 4, 5], priceMin: 450, priceMax: 500 },
      { type: WorkType.COLLOQUIUM, numbers: [1, 2, 3, 5], priceMin: 350, priceMax: 400 },
    ],
  },
  {
    subjectId: 'cschem',
    name: 'Цифрова схемотехніка',
    semester: 4,
    works: [{ type: WorkType.LAB, numbers: [1, 2, 3, 4, 5, 6], priceMin: 450, priceMax: 500 }],
  },
  {
    subjectId: 'probstat',
    name: 'Теорія ймовірностей та математична статистика',
    semester: 4,
    works: [
      { type: WorkType.LAB, numbers: [1, 2, 4, 5], priceMin: 350, priceMax: 400 },
      { type: WorkType.LAB, numbers: [3], priceMin: 450, priceMax: 500 },
      { type: WorkType.PROBLEM, variant: 'на парі / консультації', priceMin: null },
      { type: WorkType.PROBLEM, variant: 'на модульній контрольній роботі', priceMin: null },
      { type: WorkType.EXAM, priceMin: null },
    ],
  },
  {
    subjectId: 'amo',
    name: 'Алгоритми та методи обчислень',
    semester: 4,
    works: [
      { type: WorkType.LAB, numbers: [1, 2, 3, 4, 5], priceMin: 360, priceMax: 450 },
      { type: WorkType.ADDITIONAL_LAB, numbers: [6], priceMin: null },
    ],
  },
];
