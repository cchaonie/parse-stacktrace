import { FilesProps } from './type';

import styles from './files.css';
import { useContext } from 'react';
import FilesContext from '../../contexts/FilesContext';
import { useNavigate } from 'react-router-dom';

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
