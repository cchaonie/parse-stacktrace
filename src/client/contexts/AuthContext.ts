import React from 'react';
import { UserStatus } from '../models';

export interface AuthValue {
  userId: string;
  userStatus: UserStatus;
}

export const AuthContext = React.createContext<AuthValue | null>(null);
