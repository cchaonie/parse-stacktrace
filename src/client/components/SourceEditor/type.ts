import { ReactNode } from 'react';
import { Connection } from 'sharedb/lib/client';
import { FileDescription } from '../../models';

export interface SourceEditorConnectProps {
  children: (contextValues: {
    files: FileDescription[];
    connection: Connection;
  }) => ReactNode;
}

export interface SourceEditorProps {
  files: FileDescription[];
  connection: Connection;
}
