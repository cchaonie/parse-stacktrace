// export const LoadingStatus = {
//   Loading: 1,
//   Loaded: 2,
//   Failed: 3,
// };

// export type LoadingStatus = typeof LoadingStatus[keyof typeof LoadingStatus];

export enum LoadingStatus {
  Loading = 'Loading',
  Loaded = 'Loaded',
  Failed = 'Failed',
}

export type StatusListener = (status: LoadingStatus) => void;

export type JSON0Path = Array<string | number>;

export interface JSON0StringInsertOperation {
  p: JSON0Path;
  si: string;
}
