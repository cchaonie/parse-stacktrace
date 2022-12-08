import { memo, useEffect, useState } from 'react';
import { AuthContext } from '../../contexts';
import { useRequest } from '../../hooks/useRequest/useRequest';
import { getFingerprint, UserStatus } from '../../models';

export const AuthContainer = ({ children }) => {
  const [userId, setUserId] = useState('');
  const [userStatus, setUserStatus] = useState(UserStatus.NotLoggedIn);

  useEffect(() => {
    getFingerprint()
      .then(({ visitorId }) => {
        setUserId(visitorId);
        console.log(`Visitor: ${visitorId}`);
      })
      .catch(e => console.error(`Getting fingerprint failed`, e));
  }, []);

  useRequest(
    {
      url: '/login',
      initOptions: {
        method: 'POST',
      },
    },
    res => {
      if (res.ok) {
        setUserStatus(UserStatus.LoggedIn);
        console.log(`User login successfully`);
      }
    },
    e => console.error(`User login failed`, e)
  );

  return (
    <AuthContext.Provider
      value={{
        userId,
        userStatus,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
