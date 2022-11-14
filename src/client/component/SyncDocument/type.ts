import { ReactNode } from 'react';
import { ShareDBDocStatus } from '../../model/core/type';

export interface SyncDocumentProps {
  onStatusChange: (status: ShareDBDocStatus) => void;
  children: ReactNode;
}
