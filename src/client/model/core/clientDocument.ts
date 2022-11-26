import { Doc } from 'sharedb';
import _ from 'lodash';
import { BaseOperation, Descendant } from 'slate';

import { createConverter } from '../operationConverter';

export class ClientDocument {
  shareDBDoc: Doc;

  getDocumentData(): Descendant[] {
    if (!this.shareDBDoc) {
      throw new Error('The related shareDBDoc has not been initialized yet.');
    }
    return _.cloneDeep(this.shareDBDoc.data);
  }

  submitOperation(op: BaseOperation) {
    try {
      const converter = createConverter(this.getDocumentData(), op);
      const sharedbOps = converter.convert();
      _.forEach(sharedbOps, sharedbOp => {
        this.shareDBDoc.submitOp(sharedbOp);
      });
    } catch (error) {
      console.error(error);
    }
  }

  submitOperations(ops: BaseOperation[]) {
    _.each(ops, op => {
      this.submitOperation(op);
    });
  }
}
