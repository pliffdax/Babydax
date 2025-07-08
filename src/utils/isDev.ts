import { DEVELOPERS } from '@/config';

export const isDev = (userId: string): boolean => {
  return DEVELOPERS.includes(userId);
};
