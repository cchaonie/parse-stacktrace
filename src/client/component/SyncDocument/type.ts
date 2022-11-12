import { ReactNode } from 'react';
import { LoadingStatus } from '../../model/core/type';

export interface SyncDocumentProps {
  onStatusChange: (status: LoadingStatus) => void;
  children: ReactNode;
}
