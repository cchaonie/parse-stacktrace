import { useState } from 'react';
import { Editor, SyncDocument } from './components';
import { LoadingStatus } from './models/types';

import './app.css';

export default () => {
  const [status, setStatus] = useState<LoadingStatus>(LoadingStatus.Loading);
  return (
    <SyncDocument onStatusChange={status => setStatus(status)}>
      <div className='font-sans bg-red-100' id='board'>
        <Editor status={status} />
      </div>
    </SyncDocument>
  );
};
