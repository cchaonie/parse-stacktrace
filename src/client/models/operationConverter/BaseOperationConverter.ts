import { BaseOperation, Descendant } from 'slate';
import { JSON0Operation } from '../types';
import _ from 'lodash';

export default class BaseOperationConverter<T extends JSON0Operation> {
  slateOperation: BaseOperation;
  docData: Descendant[];

  constructor(docData: Descendant[], op: BaseOperation) {
    this.docData = docData;
    this.slateOperation = op;
  }

  convert(): T {
    throw new Error('Sub-Class should override this behavior');
  }
}
