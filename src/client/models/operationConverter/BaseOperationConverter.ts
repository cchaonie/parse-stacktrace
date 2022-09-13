import { BaseOperation } from 'slate';
import { JSON0Operation } from '../types';
import _ from 'lodash';

export default class BaseOperationConverter<T extends JSON0Operation> {
  slateOperation: BaseOperation;

  constructor(op: BaseOperation) {
    this.slateOperation = op;
  }

  convert(): T {
    throw new Error('Sub-Class should override this behavior');
  }
}
