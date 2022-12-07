import { useCallback } from 'react';
import { Editor } from 'slate';
import { useSlate } from 'slate-react';

import { Iconfont } from '../../../../../Iconfont';

import styles from './toolbar.css';

export const Toolbar = () => {
  const editor = useSlate();

  const handleStyle = useCallback(
    (style: string) => {
      Editor.addMark(editor, style, true);
    },
    [editor]
  );

  return (
    <div className={styles['toolbar']}>
      <div
        onClick={() => handleStyle('bold')}
        className={`${styles['toolbarItem']} ${styles['bold']}`}
      >
        <Iconfont name='bold' fontSize='20px' />
      </div>
      <div
        onClick={() => handleStyle('italic')}
        className={`${styles['toolbarItem']} ${styles['italic']}`}
      >
        <Iconfont name='italics' fontSize='20px' />
      </div>
    </div>
  );
};
