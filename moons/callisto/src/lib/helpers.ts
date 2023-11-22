const hash = (s: string): number => {
  let v = 0;
  if (s.length === 0) return v;
  for (let i = 0; i < s.length; i++) {
    const char = s.charCodeAt(i);
    v = (v << 5) - v + char;
    v = v & v;
  }
  return Math.abs(v);
};

export const shuffle = <T>(arr: T[], seed: string): T[] => {
  const result = [...arr];
  const random = (max: number) => Math.floor(hash(seed + max.toString()) * 1000) % max;
  for (let i = result.length - 1; i > 0; i--) {
    const j = random(i + 1);
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
};
