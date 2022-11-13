import React from 'react';
import FileDescription from '../model/state/FileDescription';

export interface FilesContextValue {
  files: FileDescription[];
  setFiles: (files: FileDescription[]) => void;
}

const FilesContext = React.createContext<FilesContextValue | null>(null);

export default FilesContext;
