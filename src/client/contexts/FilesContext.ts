import React from 'react';
import { FileDescription } from '../models';

export interface FilesValue {
  files: FileDescription[];
  setFiles: (files: FileDescription[]) => void;
}

export const FilesContext = React.createContext<FilesValue | null>(null);
