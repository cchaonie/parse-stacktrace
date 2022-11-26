import { useCallback } from 'react';
import { Editor } from 'slate';
import { useSlate } from 'slate-react';
import styles from './toolbar.css';

export default () => {
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
        B
      </div>
      <div
        onClick={() => handleStyle('italic')}
        className={`${styles['toolbarItem']} ${styles['italic']}`}
      >
        I
      </div>
    </div>
  );
};
