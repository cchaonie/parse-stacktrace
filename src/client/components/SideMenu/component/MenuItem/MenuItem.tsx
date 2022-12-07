import { SyntheticEvent, useContext, useState } from 'react';
import { AuthContext, FilesContext } from '../../../../contexts';
import { FileDescription } from '../../../../models';
import { Iconfont } from '../../../Iconfont';
import Arrow from '../Arrow';
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

    const newFileName = generateNewFileName(
      files.filter(f => f.creator === userId).map(f => f.name)
    );
    const createTime = +new Date();

    fetch('/files', {
      method: 'PUT',
      body: JSON.stringify({
        name: newFileName,
        createTime,
        userId,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.json())
      .then(json => {
        if (json.message === 'OK') {
          setFiles(
            [
              ...files,
              new FileDescription(newFileName, userId, createTime),
            ].sort((a, b) => a.createTime - b.createTime)
          );
        }
      });
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
