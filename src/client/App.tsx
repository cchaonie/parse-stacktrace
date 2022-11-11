import { useState } from 'react';
import { Editor, SideMenu, SyncDocument } from './component';
import { LoadingStatus } from './model/types';

import './app.css';

export default () => {
  const [status, setStatus] = useState<LoadingStatus>(LoadingStatus.Loading);
  const [hasDocOpen, setHasDocOpen] = useState(false);
  return (
    <SyncDocument onStatusChange={status => setStatus(status)}>
      <div id='board'>
        <SideMenu />
        {hasDocOpen ? (
          <Editor status={status} />
        ) : (
          <div className='welcome'>Create a new document from the side menu</div>
        )}
      </div>
    </SyncDocument>
  );
};
