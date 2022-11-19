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

  return (
    <i
      className={`${styles.iconfont} ${styles[`icon-${name}`]} ${
        animated ? styles['iconfont-animated'] : ''
      }`}
      style={defaultStyle}
    ></i>
  );
};
