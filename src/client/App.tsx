import { useState } from 'react';
import { createEditor } from 'slate';

import { Slate, Editable, withReact } from 'slate-react';
import initialState from './models';

export default () => {
  const [editor] = useState(() => withReact(createEditor()));
  const handleKeyDown = event => {
    if (event.key === '&') {
      // Prevent the ampersand character from being inserted.
      event.preventDefault();
      // Execute the `insertText` method when the event occurs.
      editor.insertText('and');
    }
  };
  return (
    <Slate editor={editor} value={initialState}>
      <Editable onKeyDown={handleKeyDown} />
    </Slate>
  );
};
