import './index.css';

type EuropaProps = {
  height?: React.CSSProperties['height'];
  width?: React.CSSProperties['width'];
};

const Europa = ({ height, width }: EuropaProps) => {
  return <div id="europa" style={{ height, width }}></div>;
};

export default Europa;
