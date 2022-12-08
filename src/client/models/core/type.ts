import { Doc } from 'sharedb';
import { ClientDocumentEvents } from './constants';

// export const LoadingStatus = {
//   Loading: 1,
//   Loaded: 2,
//   Failed: 3,
// };

// export type LoadingStatus = typeof LoadingStatus[keyof typeof LoadingStatus];

export type ClientDocumentEventHandler = (doc: Doc) => void;

export type ClientDocumentListeners = {
  [key in ClientDocumentEvents]?: ClientDocumentEventHandler[];
};
