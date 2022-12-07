import { useCallback } from 'react';
import {
  Slate,
  Editable,
  RenderElementProps,
  RenderLeafProps,
} from 'slate-react';

import { Toolbar, RenderElement, RenderLeaf } from './components';

import styles from './editor.css';

export const Editor = ({ instance, initialValue }) => {
  const renderElement = useCallback(
    (props: RenderElementProps) => <RenderElement {...props} />,
    []
  );
  const renderLeaf = useCallback(
    (props: RenderLeafProps) => <RenderLeaf {...props} />,
    []
  );

  return (
    <div className={styles.editor}>
      <Slate editor={instance} value={initialValue}>
        <Toolbar />
        <Editable
          renderElement={renderElement}
          renderLeaf={renderLeaf}
          style={{ flexGrow: 1, paddingInline: '8px' }}
        />
      </Slate>
    </div>
  );
};
