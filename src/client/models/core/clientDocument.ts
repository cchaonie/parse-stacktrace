import { Doc } from 'sharedb';
import _ from 'lodash';
import { BaseOperation, Descendant } from 'slate';

import { createConverter } from '../operationConverter';
import { ClientDocumentEventHandler, ClientDocumentListeners } from './type';
import { ClientDocumentEvents } from './constants';

export class ClientDocument {
  shareDBDoc: Doc;
  listeners: ClientDocumentListeners = {};

  getDocumentData(): Descendant[] {
    if (!this.shareDBDoc) {
      throw new Error('The related shareDBDoc has not been initialized yet.');
    }
    return _.cloneDeep(this.shareDBDoc.data);
  }

  addListener(
    eventName: ClientDocumentEvents,
    listener: ClientDocumentEventHandler
  ) {
    if (!this.listeners[eventName]) {
      this.listeners[eventName] = [];
    }
    this.listeners[eventName].push(listener);
  }

  removeListener(
    eventName: ClientDocumentEvents,
    listener: ClientDocumentEventHandler
  ) {
    const eventListeners = this.listeners[eventName];
    let index = -1;
    for (let i = 0; i < eventListeners.length - 1; i += 1) {
      if (eventListeners[i] === listener) {
        index = i;
        break;
      }
    }
    if (index > -1) {
      eventListeners.splice(index, 1);
    }
  }

  dispatch(eventName: ClientDocumentEvents) {
    const eventListeners = this.listeners[eventName];
    if (eventListeners?.length > 0) {
      for (const el of eventListeners) {
        el(this.shareDBDoc);
      }
    }
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
