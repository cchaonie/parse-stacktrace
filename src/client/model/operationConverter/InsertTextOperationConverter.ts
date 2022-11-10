import { InsertTextOperation } from 'slate';
import { JSON0Path, JSON0StringInsertOperation } from '../types';
import _ from 'lodash';
import BaseOperationConverter from './BaseOperationConverter';

export class InsertTextOperationConverter extends BaseOperationConverter {
  convert() {
    const json0Path: JSON0Path = [];
    const { path, offset, text } = this.slateOperation as InsertTextOperation;
    _.each(path, (value, index) => {
      json0Path.push(value);
      if (index < path.length - 1) {
        json0Path.push('children');
      }
    });
    json0Path.push('text');

    // offset
    json0Path.push(offset);

    return [
      {
        p: json0Path,
        si: text,
      },
    ];
  }
}
