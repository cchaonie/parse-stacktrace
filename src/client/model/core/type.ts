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
