import MenuItem from './components/MenuItem';

import './sideMenu.css';

export default () => {
  return (
    <div className='sideMenu sideMenu-background'>
      <h1 className='sideMenu-title'>Collaborative Editor</h1>
      <div className='sideMenu-operationSection'>
        <MenuItem name='files' />
      </div>
    </div>
  );
};
