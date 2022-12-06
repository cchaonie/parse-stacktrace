import { SyntheticEvent, useContext, useState } from 'react';
import { AuthContext, FilesContext } from '../../../../contexts';
import FileDescription from '../../../../models/state/FileDescription';
import Iconfont from '../../../Iconfont';
import Arrow from '../Arrow';
import { defaultFileExtension, defaultFileName } from './constant';
import { generateNewFileName } from './helpers';

import styles from './menuItem.css';
import { MenuItemProps } from './type';

const MenuItem = ({ name, children }: MenuItemProps) => {
  const [direction, setDirection] = useState('right');
  const { files, setFiles } = useContext(FilesContext);
  const { userId } = useContext(AuthContext);

  const handleArrowClick = () =>
    direction === 'right' ? setDirection('down') : setDirection('right');

  const handleAddNewFile = (e: SyntheticEvent) => {
    e.stopPropagation();
    setFiles([
      ...files,
      new FileDescription(
        `${generateNewFileName(files.map(f => f.name))}`,
        userId,
        new Date()
      ),
    ]);
  };

  return (
    <div className={styles.menuItem}>
      <div className={styles['menuItem-itemTitle']} onClick={handleArrowClick}>
        <div className={styles['menuItem-operationIcon']}>
          <Arrow direction={direction} />
        </div>
        <div className={styles['menuItem-mainOperation']}>
          <div className={styles['menuItem-operationText']}>{name}</div>
          <div
            className={styles['menuItem-moreOperation']}
            onClick={handleAddNewFile}
          >
            <Iconfont name='add-select' fontSize='20px' />
          </div>
        </div>
      </div>
      {direction === 'down' && (
        <div className={styles['menuItem-itemContent']}>{children}</div>
      )}
    </div>
  );
};

export default MenuItem;
