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

export enum UserStatus {
  NotLoggedIn = 'Not Logged in',
  LoggedIn = 'Logged in',
}

export type StatusListener = (status: LoadingStatus) => void;
