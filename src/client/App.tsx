import { useState } from 'react';
import { Editor, SideMenu, SyncDocument } from './components';
import { LoadingStatus } from './models/types';

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
