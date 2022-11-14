// export const LoadingStatus = {
//   Loading: 1,
//   Loaded: 2,
//   Failed: 3,
// };

// export type LoadingStatus = typeof LoadingStatus[keyof typeof LoadingStatus];

export enum ShareDBDocStatus {
  Loading = 'Loading',
  Loaded = 'Loaded',
  LoadFailed = 'LoadFailed',
}

export enum UserStatus {
  NotLoggedIn = 'Not Logged in',
  LoggedIn = 'Logged in',
}

export type StatusListener = (status: ShareDBDocStatus) => void;
