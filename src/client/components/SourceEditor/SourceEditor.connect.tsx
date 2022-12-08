import { useContext } from 'react';
import { AuthContext, ConnectionContext, FilesContext } from '../../contexts';

export const SourceEditorConnect = ({ children }) => {
  const { userStatus } = useContext(AuthContext);
  const { files } = useContext(FilesContext);
  const { connection } = useContext(ConnectionContext);

  return children({ userStatus, files, connection });
};
