import { IconFontProps } from './type';

import './iconfont.css';

export default ({
  name,
  rotate,
  animated = false,
  fontSize = '16px',
}: IconFontProps) => {
  let defaultStyle: React.CSSProperties = {
    fontSize,
  };

  if (rotate) {
    defaultStyle = {
      ...defaultStyle,
      transform: `rotate(${rotate}deg)`,
    };
  }

  return (
    <i
      className={`iconfont icon-${name} ${animated ? 'iconfont-animated' : ''}`}
      style={defaultStyle}
    ></i>
  );
};
