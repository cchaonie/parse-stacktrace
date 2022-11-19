import { useContext } from 'react';
import FilesContext from '../../context/FilesContext';
import Files from '../Files';
import MenuItem from './component/MenuItem';

import styles from './sideMenu.css';

export default () => {
  const { files } = useContext(FilesContext);

  return (
    <div className={`${styles.sideMenu} ${styles['sideMenu-background']}`}>
      <h1 className={styles['sideMenu-title']}>Collaborative Editor</h1>
      <div className={styles['sideMenu-operationSection']}>
        <MenuItem name='FILES'>
          <Files fileNames={files.map(f => f.name)} />
        </MenuItem>
      </div>
    </div>
  );
};
