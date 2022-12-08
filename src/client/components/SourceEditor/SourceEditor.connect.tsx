import { useContext } from 'react';
import { ConnectionContext, FilesContext } from '../../contexts';

export const SourceEditorConnect = ({ children }) => {
  const { files } = useContext(FilesContext);
  const { connection } = useContext(ConnectionContext);
  return children({ files, connection });
};
