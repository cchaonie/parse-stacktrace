import { BaseOperation, InsertTextOperation } from 'slate';
import { JSON0Path, JSON0StringInsertOperation } from './types';
import _ from 'lodash';

export class OperationConverter {
  slateOperation: BaseOperation;

  setSlateOperation(op: BaseOperation) {
    this.slateOperation = op;
    return this;
  }

  convert(): JSON0StringInsertOperation {
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

    return {
      p: json0Path,
      si: text,
    };
  }
}
