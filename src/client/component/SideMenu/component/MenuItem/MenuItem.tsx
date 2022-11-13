import { SyntheticEvent, useContext, useState } from 'react';
import FilesContext from '../../../../context/FilesContext';
import FileDescription from '../../../../model/state/FileDescription';
import Iconfont from '../../../Iconfont';
import Arrow from '../Arrow';

import './menuItem.css';
import { MenuItemProps } from './type';

const MenuItem = ({ name, children }: MenuItemProps) => {
  const [direction, setDirection] = useState('right');
  const { files, setFiles } = useContext(FilesContext);

  const handleArrowClick = () =>
    direction === 'right' ? setDirection('down') : setDirection('right');

  const handleMoreOperations = (e: SyntheticEvent) => {
    e.stopPropagation();
    setFiles([...files, new FileDescription('New File.txt', '', new Date())]);
  };

  return (
    <div className='menuItem'>
      <div className='menuItem-itemTitle' onClick={handleArrowClick}>
        <div className='menuItem-operationIcon'>
          <Arrow direction={direction} />
        </div>
        <div className='menuItem-mainOperation'>
          <div className='menuItem-operationText'>{name}</div>
          <div className='menuItem-moreOperation' onClick={handleMoreOperations}>
            <Iconfont name='add-select' fontSize='20px' />
          </div>
        </div>
      </div>
      {direction === 'down' && (
        <div className='menuItem-itemContent'>{children}</div>
      )}
    </div>
  );
};

export default MenuItem;
