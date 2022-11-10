// export const LoadingStatus = {
//   Loading: 1,
//   Loaded: 2,
//   Failed: 3,
// };

import { Node } from 'slate';

// export type LoadingStatus = typeof LoadingStatus[keyof typeof LoadingStatus];

export enum LoadingStatus {
  Loading = 'Loading',
  Loaded = 'Loaded',
  Failed = 'Failed',
}

export type StatusListener = (status: LoadingStatus) => void;

export type JSON0Path = Array<string | number>;

export interface JSON0Operation {
  p: JSON0Path;
}

export interface JSON0StringInsertOperation extends JSON0Operation {
  si: string;
}

export interface JSON0StringRemoveOperation extends JSON0Operation {
  sd: string;
}

export interface JSON0ObjectInsertOperation extends JSON0Operation {
  li: Node;
}

export interface JSON0ObjectRemoveOperation extends JSON0Operation {
  od: Node;
}

