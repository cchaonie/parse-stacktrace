import { Doc } from 'sharedb';
import _ from 'lodash';
import { BaseOperation, Descendant } from 'slate';

import { createConverter } from '../operationConverter';

export class ClientDocument {
  // initialContent: Descendant[];
  shareDBDoc: Doc;
  // statusListener: Array<StatusListener> = [];

  // constructor(initialContent: Descendant[]) {
  //   this.initialContent = initialContent;
  //   this.initialize();
  // }

  getDocumentData(): Descendant[] {
    if (!this.shareDBDoc) {
      throw new Error('The related shareDBDoc has not been initialized yet.');
    }
    return _.cloneDeep(this.shareDBDoc.data);
  }

  // initialize() {
  //   initializeShareDBDocument()
  //     .then(doc => {
  //       this.shareDBDoc = doc;
  //       this.serverDocumentStatus = ShareDBDocStatus.Loaded;
  //     })
  //     .catch(e => {
  //       console.error(e);
  //       this.serverDocumentStatus = ShareDBDocStatus.LoadFailed;
  //     })
  //     .finally(() => this.invokeStatusListeners());
  // }

  // invokeStatusListeners() {
  //   this.statusListener.forEach(listener => listener(this.serverDocumentStatus));
  // }

  // addStatusListener(listener: StatusListener) {
  //   this.statusListener.push(listener);
  // }

  // removeStatusListener(listener: StatusListener) {
  //   const index = this.statusListener.indexOf(listener);
  //   this.statusListener.splice(index, 1);
  // }

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

// const clientDocument = new ClientDocument(initialContent);

// export default clientDocument;
