import { useSlateStatic } from 'slate-react';
import styles from './index.css';

export const SourceView = () => {
  const editor = useSlateStatic();
  return (
    <div className={styles.sourceView}>
      <pre>
        <code>{JSON.stringify(editor.children, null, 2)}</code>
      </pre>
    </div>
  );
};
