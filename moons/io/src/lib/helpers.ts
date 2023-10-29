import { Coordinate } from './types';

export const getDotCoord = (el: Element): Coordinate => {
  const parentRect = document.getElementById('io')!.getBoundingClientRect();
  const rect = el.getBoundingClientRect();
  return { x: rect.x - parentRect.x + rect.width / 2, y: rect.y - parentRect.y + rect.width / 2 };
};
