import Iconfont from '../../../Iconfont';

import './arrow.css';

export default ({ direction = 'right' }) => (
  <Iconfont
    name='arrow-right'
    animated
    rotate={direction === 'right' ? 0 : 90}
    fontSize='20px'
  />
);
