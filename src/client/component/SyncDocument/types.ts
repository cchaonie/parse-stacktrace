import { ReactNode } from 'react';
import { LoadingStatus } from '../../model/types';

export interface SyncDocumentProps {
  onStatusChange: (status: LoadingStatus) => void;
  children: ReactNode;
}
