import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { FilesProps } from './type';
import { FilesContext } from '../../contexts';

import styles from './files.css';

export default ({ fileNames }: FilesProps) => {
  const { files, setFiles } = useContext(FilesContext);
  const navigate = useNavigate();

  const handleFileClick = (index: number) => {
    const targetFile = files.find((_, i) => i === index);
    setFiles(
      files.map((f, i) => {
        if (i === index) {
          f.active = true;
        } else {
          f.active = false;
        }
        return f;
      })
    );
    navigate(`/document/${targetFile.creator}/${targetFile.name}`);
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
