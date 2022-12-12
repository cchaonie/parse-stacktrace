import { Iconfont } from '../../../Iconfont';
import { ArrowProps } from './type';

export const Arrow = ({ direction = 'right' }: ArrowProps) => (
  <Iconfont
    name='arrow-right'
    animated
    rotate={direction === 'right' ? 0 : 90}
    fontSize='20px'
  />
);
