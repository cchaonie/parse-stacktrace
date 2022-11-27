import { IconFontProps } from './type';

import styles from './iconfont.css';

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

  if (animated) {
    defaultStyle = {
      ...defaultStyle,
      transition: 'ease-in transform 300ms',
    };
  }

  return (
    <i
      className={`${styles.iconfont} ${styles[`icon-${name}`]}`}
      style={defaultStyle}
    ></i>
  );
};
