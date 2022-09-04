import { ReactNode } from 'react';
import { LoadingStatus } from '../../models/types';

export interface SyncDocumentProps {
  onStatusChange: (status: LoadingStatus) => void;
  children: ReactNode;
}
