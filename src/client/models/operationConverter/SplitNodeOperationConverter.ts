import { InsertNodeOperation } from 'slate';
import { JSON0ObjectInsertOperation, JSON0Path, JSON0StringInsertOperation } from '../types';
import _ from 'lodash';
import BaseOperationConverter from './BaseOperationConverter';

export class InsertTextOperationConverter extends BaseOperationConverter<JSON0ObjectInsertOperation> {
  convert() {
    const json0Path: JSON0Path = [];
    const { path, node } = this.slateOperation as InsertNodeOperation;
    _.each(path, (value, index) => {
      json0Path.push(value);
      if (index < path.length - 1) {
        json0Path.push('children');
      }
    });
    json0Path.push('text');

    return {
      p: json0Path,
      li: node,
    };
  }
}
