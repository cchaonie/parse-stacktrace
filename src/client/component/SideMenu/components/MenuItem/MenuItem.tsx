import { useState } from 'react';
import Iconfont from '../../../Iconfont';
import Arrow from '../Arrow';

import './menuItem.css';
import { MenuItemProps } from './types';

export default ({ name }: MenuItemProps) => {
  const [direction, setDirection] = useState('right');
  const handleArrowClick = () =>
    direction === 'right' ? setDirection('down') : setDirection('right');

  return (
    <div className='menuItem' onClick={handleArrowClick}>
      <div className='menuItem-operationIcon'>
        <Arrow direction={direction} />
      </div>
      <div className='menuItem-mainOperation'>
        <div className='menuItem-operationText'>{name}</div>
        <div className='menuItem-moreOperation'>
          <Iconfont name='add-select' fontSize='20px' />
        </div>
      </div>
    </div>
  );
};
