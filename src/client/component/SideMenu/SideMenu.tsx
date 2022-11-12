import Files from '../Files';
import MenuItem from './component/MenuItem';

import './sideMenu.css';

export default () => {
  const fileNames = ['new Files.txt'];
  return (
    <div className='sideMenu sideMenu-background'>
      <h1 className='sideMenu-title'>Collaborative Editor</h1>
      <div className='sideMenu-operationSection'>
        <MenuItem name='FILES'>
          <Files fileNames={fileNames} />
        </MenuItem>
      </div>
    </div>
  );
};
