import React, { useState } from 'react';
import { createEditor } from 'slate';

import { Slate, Editable, withReact } from 'slate-react';
import initialState from './models';

export default () => {
  const [editor] = useState(() => withReact(createEditor()));
  return (
    <Slate editor={editor} value={initialState}>
      <Editable />
    </Slate>
  );
};
