import { Descendant } from 'slate';
import _ from 'lodash';

import { initialContent } from '../core';

export class FileDescription {
  name: string;
  creator: string;
  createTime: number;
  content: Descendant[];
  active: boolean;

  constructor(name: string, creator: string, createTime: number) {
    this.name = name;
    this.creator = creator;
    this.createTime = createTime;
    this.active = false;

    this.content = _.cloneDeep(initialContent);
  }
}
