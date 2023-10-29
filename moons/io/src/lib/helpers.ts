import { Coordinate } from './types';

const calcOffset = (start: Coordinate, end: Coordinate) => {
  const dx = start.x - end.x;
  const dy = start.y - end.y;
  return Math.hypot(dx, dy) / Math.PI / 2;
};

// based on https://stackoverflow.com/a/49286885/10298958
export const generateLine = (start: Coordinate, end: Coordinate) => {
  const mx = (end.x + start.x) * 0.5;
  const my = (end.y + start.y) * 0.5;
  const angle = Math.atan2(end.y - start.y, end.x - start.x) + Math.PI / 2;
  const offset = calcOffset(start, end);
  const offsetX = offset * Math.cos(angle);
  const offsetY = offset * Math.sin(angle);
  const cx = start.x > end.x ? mx - offsetX : mx + offsetX;
  const cy = start.x > end.x ? my - offsetY : my + offsetY;
  return `M${start.x} ${start.y} Q${cx} ${cy} ${end.x} ${end.y}`;
};

export const getDotCoord = (el: HTMLElement): Coordinate => {
  const parentRect = document.getElementById('io')!.getBoundingClientRect();
  const rect = el.getBoundingClientRect();
  return { x: rect.x - parentRect.x + rect.width / 2, y: rect.y - parentRect.y + rect.width / 2 };
};
