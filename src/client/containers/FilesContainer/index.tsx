import { memo, useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { AuthContext, FilesContext } from '../../contexts';
import FileDescription from '../../models/state/FileDescription';
import { parseUrl } from '../../utils';

const FilesContainer = ({ children }) => {
  const location = useLocation();
  const { userId } = useContext(AuthContext);

  const [_, collectionId, documentName] = parseUrl(location.pathname);

  const [files, setFiles] = useState<FileDescription[]>(() => {
    if (collectionId && documentName) {
      const file = new FileDescription(documentName, collectionId, +new Date());
      file.active = true;
      return [file];
    }
    return [];
  });

  useEffect(() => {
    fetch(`/files?userId=${userId}`, {
      method: 'GET',
    })
      .then(res => res.json())
      .then(({ message, data }: any) => {
        if (message === 'OK') {
          const userFiles = data as Array<any>;

          const filesNotExist = userFiles.filter(userFile =>
            !files.some(
              f => f.creator === userFile.creator && f.name === userFile.fileName
            )
          );

          setFiles([
            ...files,
            ...filesNotExist.map(
              f => new FileDescription(f.fileName, f.creator, f.createTime)
            ),
          ]);
        }
      });
  }, [userId]);

  return (
    <FilesContext.Provider
      value={{
        files,
        setFiles,
      }}
    >
      {children}
    </FilesContext.Provider>
  );
};

export default memo(FilesContainer);
