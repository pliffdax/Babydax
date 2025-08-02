import { WorkType } from '@/data/mock/Subject';

function slug(text = ''): string {
  return text
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-zа-я0-9\-]+/gi, '');
}

export function buildTaskId(
  subjectId: string,
  type: WorkType,
  number?: number,
  variant?: string,
): string {
  const typeShort = WorkTypeShort[type];
  const numPart = number !== undefined ? number.toString() : '';
  const varPart = variant ? `-${slug(variant)}` : '';
  return `${subjectId}:${typeShort}${numPart}${varPart}`;
}

export function parseTaskId(taskId: string) {
  const [subjectId, rest] = taskId.split(':');
  const match = rest.match(/^([a-z]+)(\d*)(?:-(.*))?$/);
  if (!match) throw new Error('Неверный формат taskId');

  const [, typeShort, numStr, varSlug] = match;
  return {
    subjectId,
    type: ShortToWorkType[typeShort],
    number: numStr ? Number(numStr) : undefined,
    variantSlug: varSlug,
  };
}

export const WorkTypeShort: Record<WorkType, string> = {
  [WorkType.LAB]: 'lab',
  [WorkType.ADDITIONAL_LAB]: 'alab',
  [WorkType.COLLOQUIUM]: 'col',
  [WorkType.COURSEWORK]: 'cw',
  [WorkType.DKR]: 'dkr',
  [WorkType.EXAM]: 'exam',
  [WorkType.PROBLEM]: 'prob',
  [WorkType.TEST]: 'test',
};

export const ShortToWorkType = Object.fromEntries(
  Object.entries(WorkTypeShort).map(([k, v]) => [v, k as WorkType]),
);
