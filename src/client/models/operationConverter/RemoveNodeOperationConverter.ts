import { RemoveNodeOperation } from 'slate';
import { JSON0ObjectRemoveOperation, JSON0Path } from '../types';
import _ from 'lodash';
import BaseOperationConverter from './BaseOperationConverter';

export class RemoveNodeOperationConverter extends BaseOperationConverter {
  convert() {
    const json0Path: JSON0Path = [];
    const { path, node } = this.slateOperation as RemoveNodeOperation;

    _.each(path, (value, index) => {
      json0Path.push(value);
    });

    return [
      {
        p: json0Path,
        od: node,
      },
    ];
  }
}
