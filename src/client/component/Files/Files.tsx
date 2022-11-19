import { FilesProps } from './type';

import styles from './files.css';
import { useContext } from 'react';
import FilesContext from '../../context/FilesContext';

export default ({ fileNames }: FilesProps) => {
  const { files, setFiles } = useContext(FilesContext);

  const handleFileClick = (index: number) => {
    setFiles(
      files.map((f, i) => {
        if (i === index) {
          f.active = true;
        }
        return f;
      })
    );
  };

  return (
    <div className={styles.files}>
      {fileNames.map((fileName, i) => (
        <div
          className={styles['files-item']}
          key={fileName}
          onClick={() => handleFileClick(i)}
        >
          {fileName}
        </div>
      ))}
    </div>
  );
};
