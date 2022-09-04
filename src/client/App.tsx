import { StrictMode, useState } from 'react';
import { Editor, SyncDocument } from './components';
import { LoadingStatus } from './models/types';

export default () => {
  const [status, setStatus] = useState<LoadingStatus>(LoadingStatus.Loading);
  return (
    <StrictMode>
      <SyncDocument onStatusChange={status => setStatus(status)}>
        <Editor status={status} />
      </SyncDocument>
    </StrictMode>
  );
};
