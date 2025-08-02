import { Nullable } from "@/types";

export enum WorkType {
  LAB = "Лабораторна",
  COLLOQUIUM = "Колоквіум",
  COURSEWORK = "Курсова робота",
  DKR = "ДКР",
  ADDITIONAL_LAB = "Додаткова лабораторна",
  EXAM = "Іспит",
  PROBLEM = "Задача",
  TEST = "Залік",
}

export interface WorkTypeEntry {
  type: WorkType;
  variant?: string;
  numbers?: number[];
  priceMin: Nullable<number>;
  priceMax?: Nullable<number>;
}

export interface Subject {
  subjectId: string;
  name: string;
  semester: number;
  works: WorkTypeEntry[];
}

export interface RoleSubjectAccess {
  subjectId: string;
  roleId: string; // Discord role ID
}