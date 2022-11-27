import { memo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { FilesContext } from '../../contexts';
import FileDescription from '../../models/state/FileDescription';
import { parseUrl } from '../../utils';

const FilesContainer = ({ children }) => {
  const location = useLocation();

  const [_, collectionId, documentName] = parseUrl(location.pathname);

  const [files, setFiles] = useState<FileDescription[]>(() => {
    if (collectionId && documentName) {
      const file = new FileDescription(documentName, collectionId, new Date());
      file.active = true;
      return [file];
    }
    return [];
  });

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
