import { FilesProps } from './type';

import './files.css';

export default ({ fileNames }: FilesProps) => {
  return (
    <div className='files'>
      {fileNames.map(fileName => (
        <div className='files-item' key={fileName}>
          {fileName}
        </div>
      ))}
    </div>
  );
};
