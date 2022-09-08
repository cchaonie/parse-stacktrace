import { Doc } from 'sharedb';
import { BaseOperation, Descendant } from 'slate';
import initialContent from './initialContent';
import { initialize as initializeSharedb } from './initializeShareDBDocument';
import { LoadingStatus, StatusListener } from './types';
import _ from 'lodash';
import { OperationConverter } from './operationConverter';
class ClientDocument {
  initialContent: Descendant[];
  serverDocumentStatus: LoadingStatus = LoadingStatus.Loading;
  sharedbDoc: Doc;
  statusListener: Array<StatusListener> = [];
  operationConverter: OperationConverter = new OperationConverter();

  constructor(initialContent: Descendant[]) {
    this.initialContent = initialContent;
    this.initialize();
  }

  getDocumentData() {
    return _.cloneDeep(this.sharedbDoc.data);
  }

  initialize() {
    initializeSharedb()
      .then(doc => {
        this.sharedbDoc = doc;
        this.serverDocumentStatus = LoadingStatus.Loaded;
      })
      .catch(e => {
        console.error(e);
        this.serverDocumentStatus = LoadingStatus.Failed;
      })
      .finally(() => this.invokeStatusListeners());
  }

  invokeStatusListeners() {
    this.statusListener.forEach(listener => listener(this.serverDocumentStatus));
  }

  addStatusListener(listener: StatusListener) {
    this.statusListener.push(listener);
  }

  removeStatusListener(listener: StatusListener) {
    const index = this.statusListener.indexOf(listener);
    this.statusListener.splice(index, 1);
  }

  syncOperations(ops: BaseOperation[]) {
    _.each(ops, op => {
      if (op.type === 'insert_text') {
        this.sharedbDoc.submitOp(
          this.operationConverter.setSlateOperation(op).convert()
        );
      }
    });
  }
}

const clientDocument = new ClientDocument(initialContent);

export default clientDocument;
