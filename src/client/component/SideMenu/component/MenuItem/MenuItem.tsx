import { SyntheticEvent, useState } from 'react';
import Iconfont from '../../../Iconfont';
import Arrow from '../Arrow';

import './menuItem.css';
import { MenuItemProps } from './type';

const MenuItem = ({ name, children }: MenuItemProps) => {
  const [direction, setDirection] = useState('right');

  const handleArrowClick = () =>
    direction === 'right' ? setDirection('down') : setDirection('right');

  const handleMoreOperations = (e: SyntheticEvent) => {
    e.stopPropagation();
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
      <div className='menuItem-itemContent'>{children}</div>
    </div>
  );
};

export default MenuItem;
