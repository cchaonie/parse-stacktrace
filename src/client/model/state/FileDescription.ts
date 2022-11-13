import _ from 'lodash';
import { Descendant } from 'slate';

import initialContent from '../core/initialContent';

export default class FileDescription {
  name: string;
  creator: string;
  createTime: Date;
  content: Descendant[];
  active: boolean;

  constructor(name: string, creator: string, createTime: Date) {
    this.name = name;
    this.creator = creator;
    this.createTime = createTime;
    this.active = false;

    this.content = _.cloneDeep(initialContent);
  }
}
