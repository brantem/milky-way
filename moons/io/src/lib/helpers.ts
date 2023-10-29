const calcOffset = (x1: number, y1: number, x2: number, y2: number) => {
  const dx = x1 - x2;
  const dy = y1 - y2;
  return Math.hypot(dx, dy) / Math.PI / 2;
};

// based on https://stackoverflow.com/a/49286885/10298958
export const generateLine = (x1: number, y1: number, x2: number, y2: number) => {
  const mx = (x2 + x1) * 0.5;
  const my = (y2 + y1) * 0.5;
  const angle = Math.atan2(y2 - y1, x2 - x1) + Math.PI / 2;
  const offset = calcOffset(x1, y1, x2, y2);
  const offsetX = offset * Math.cos(angle);
  const offsetY = offset * Math.sin(angle);
  const cx = x1 > x2 ? mx - offsetX : mx + offsetX;
  const cy = x1 > x2 ? my - offsetY : my + offsetY;
  return `M${x1} ${y1} Q${cx} ${cy} ${x2} ${y2}`;
};
