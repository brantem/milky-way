import { getStroke } from 'perfect-freehand';

import { STROKE_SIZE } from './constants';

const average = (a: number, b: number) => (a + b) / 2;

const getSvgPathFromStroke = (points: number[][]) => {
  const len = points.length;
  if (len < 4) return ``;

  let a = points[0];
  let b = points[1];
  const c = points[2];

  let result = `M${a[0].toFixed(2)},${a[1].toFixed(2)} Q${b[0].toFixed(2)},${b[1].toFixed(2)} ${average(
    b[0],
    c[0],
  ).toFixed(2)},${average(b[1], c[1]).toFixed(2)} T`;

  for (let i = 2, max = len - 1; i < max; i++) {
    a = points[i];
    b = points[i + 1];
    result += `${average(a[0], b[0]).toFixed(2)},${average(a[1], b[1]).toFixed(2)} `;
  }

  if (closed) {
    result += 'Z';
  }

  return result;
};

const options = {
  size: STROKE_SIZE,
  smoothing: 0.5,
  thinning: 0.5,
  streamline: 0.5,
  easing: (t: number) => t,
  start: {
    taper: 0,
    cap: true,
  },
  end: {
    taper: 0,
    cap: true,
  },
};

export const getPath = (points: readonly (readonly number[])[]) => {
  return getSvgPathFromStroke(getStroke(points as number[][], options));
};

export const getBoundingClientRectById = (id: string) => {
  const parent = document.getElementById('ganymede')!;
  const el = document.getElementById(id);
  if (!el) return;
  const parentRect = parent.getBoundingClientRect();
  const rect = el.getBoundingClientRect();
  return {
    top: rect.top - parentRect.top,
    right: rect.right - parentRect.right,
    bottom: rect.bottom - parentRect.bottom,
    left: rect.left - parentRect.left,
    x: rect.x - parentRect.x,
    y: rect.y - parentRect.y,
    width: rect.width,
    height: rect.height,
  };
};

export const downloadCanvas = (name: string, canvas: HTMLCanvasElement) => {
  const a = document.createElement('a');
  a.download = name;
  a.href = canvas.toDataURL();
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
};
