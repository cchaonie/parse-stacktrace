import { BaseOperation, Descendant } from 'slate';
import { JSON0Operation } from './type';
import _ from 'lodash';

export default class BaseOperationConverter {
  slateOperation: BaseOperation;
  docData: Descendant[];

  constructor(docData: Descendant[], op: BaseOperation) {
    this.docData = docData;
    this.slateOperation = op;
  }

  convert(): JSON0Operation[] {
    throw new Error('Sub-Class should override this behavior');
  }
}
