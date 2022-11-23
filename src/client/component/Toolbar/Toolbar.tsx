import { useCallback } from 'react';
import { Transforms, Text } from 'slate';
import { useSlate } from 'slate-react';
import styles from './toolbar.css';

export default () => {
  const editor = useSlate();
  const handleBold = useCallback(() => {
    Transforms.setNodes(
      editor,
      { type: 'bold' },
      {
        at: editor.selection,
        match: node => Text.isText(node),
        split: true,
      }
    );
  }, [editor]);
  return (
    <div className={styles['toolbar']}>
      <div
        onClick={handleBold}
        className={`${styles['toolbarItem']} ${styles['bold']}`}
      >
        B
      </div>
      <div className={`${styles['toolbarItem']} ${styles['italic']}`}>I</div>
    </div>
  );
};
