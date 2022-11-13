import { useState } from 'react';
import { Editor, SideMenu, SyncDocument } from './component';

import './app.css';
import { LoadingStatus } from './model/core/type';
import FilesContext, { FilesContextValue } from './context/FilesContext';
import FileDescription from './model/state/FileDescription';

export default () => {
  const [status, setStatus] = useState<LoadingStatus>(LoadingStatus.Loading);
  const [files, setFiles] = useState<FileDescription[]>([]);

  const initialFilesContext: FilesContextValue = {
    files,
    setFiles,
  };

  const hasDocOpen = files.some(f => f.active);

  return (
    <FilesContext.Provider value={initialFilesContext}>
      <SyncDocument onStatusChange={status => setStatus(status)}>
        <div id='board'>
          <SideMenu />
          {hasDocOpen ? (
            <Editor status={status} />
          ) : (
            <div className='welcome'>
              Create a new document from the side menu
            </div>
          )}
        </div>
      </SyncDocument>
    </FilesContext.Provider>
  );
};
