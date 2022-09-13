import { BaseOperation, InsertTextOperation } from 'slate';
import { JSON0Path, JSON0StringInsertOperation } from '../types';
import _ from 'lodash';

export default class BaseOperationConverter {
  slateOperation: BaseOperation;

  constructor(op: BaseOperation) {
    this.slateOperation = op;
  }

  convert(): JSON0StringInsertOperation {
    throw new Error('Sub-Class should override this behavior');
  }
}
