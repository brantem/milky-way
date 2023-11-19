export type Moon = {
  url: string;
  width?: React.CSSProperties['width'];
  height?: React.CSSProperties['height'];
  data: Record<string, any>;
  debug?: boolean;
};
