import { useContext } from 'react';
import FilesContext from '../../context/FilesContext';
import Files from '../Files';
import MenuItem from './component/MenuItem';

import './sideMenu.css';

export default () => {
  const { files } = useContext(FilesContext);

  return (
    <div className='sideMenu sideMenu-background'>
      <h1 className='sideMenu-title'>Collaborative Editor</h1>
      <div className='sideMenu-operationSection'>
        <MenuItem name='FILES'>
          <Files fileNames={files.map(f => f.name)} />
        </MenuItem>
      </div>
    </div>
  );
};
