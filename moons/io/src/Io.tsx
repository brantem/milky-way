type IoProps = {
  height?: React.CSSProperties['height'];
  width?: React.CSSProperties['width'];
};

const Io = ({ height, width }: IoProps) => {
  return <div id="io" style={{ height, width }}></div>;
};

export default Io;
