import { Doc } from 'sharedb';
import { BaseOperation, Descendant } from 'slate';
import initialContent from './initialContent';
import { initializeShareDBDocument } from './initializeShareDBDocument';
import { LoadingStatus, StatusListener } from './types';
import _ from 'lodash';
import { createConverter } from './operationConverter';

class ClientDocument {
  initialContent: Descendant[];
  serverDocumentStatus: LoadingStatus = LoadingStatus.Loading;
  sharedbDoc: Doc;
  statusListener: Array<StatusListener> = [];

  constructor(initialContent: Descendant[]) {
    this.initialContent = initialContent;
    this.initialize();
  }

  getDocumentData(): Descendant[] {
    return _.cloneDeep(this.sharedbDoc.data);
  }

  initialize() {
    initializeShareDBDocument()
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

  submitOperations(ops: BaseOperation[]) {
    _.each(ops, op => {
      // TODO: implement the rest operations
      try {
        this.sharedbDoc.submitOp(createConverter(this.getDocumentData(), op).convert());
      } catch (error) {
        console.log(error);
      }
    });
  }
}

const clientDocument = new ClientDocument(initialContent);

export default clientDocument;
