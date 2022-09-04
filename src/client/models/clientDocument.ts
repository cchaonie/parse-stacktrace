import { Doc } from 'sharedb';
import { Descendant } from 'slate';
import initialContent from './initialContent';
import { initialize as initializeSharedb } from './shareDBDocument';
import { LoadingStatus, StatusListener } from './types';

class ClientDocument {
  initialContent: Descendant[];
  serverDocumentStatus: LoadingStatus;
  sharedbDoc: Doc;
  statusListener: Array<StatusListener> = [];

  constructor(initialContent: Descendant[]) {
    this.initialContent = initialContent;
    this.serverDocumentStatus = LoadingStatus.Loading;
    this.initialize();
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
}

const clientDocument = new ClientDocument(initialContent);

export default clientDocument;
