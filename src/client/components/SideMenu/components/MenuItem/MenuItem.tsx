import { useState } from 'react';
import Arrow from '../Arrow';

import './menuItem.css';
import { MenuItemProps } from './types';

export default ({ name }: MenuItemProps) => {
  const [direction, setDirection] = useState('right');
  const handleArrowClick = () =>
    direction === 'right' ? setDirection('down') : setDirection('right');

  return (
    <div className='menuItem'>
      <div className='menuItem-operationIcon' onClick={handleArrowClick}>
        <Arrow direction={direction} />
      </div>
      <div className='menuItem-operationText' onClick={handleArrowClick}>
        {name}
      </div>
    </div>
  );
};
