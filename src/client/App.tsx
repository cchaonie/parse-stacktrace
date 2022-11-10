import { useState } from 'react';
import { Editor, SideMenu, SyncDocument } from './component';
import { LoadingStatus } from './model/types';

import './app.css';

export default () => {
  const [status, setStatus] = useState<LoadingStatus>(LoadingStatus.Loading);
  return (
    <SyncDocument onStatusChange={status => setStatus(status)}>
      <div id='board'>
        <SideMenu />
        <Editor status={status} />
      </div>
    </SyncDocument>
  );
};
