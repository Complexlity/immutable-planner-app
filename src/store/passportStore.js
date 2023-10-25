import { createContext, useContext, useState, useLayoutEffect } from 'react';
import { config, passport, provider } from '@imtbl/sdk';

const passportConfig = {
  baseConfig: new config.ImmutableConfiguration({
    environment: config.Environment.SANDBOX
  }),
  clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
  redirectUri: process.env.NEXT_PUBLIC_CALLBACK_URL,
  logoutRedirectUri: process.env.NEXT_PUBLIC_LOGOUT_URL,
  audience: 'platform_api',
  scope: 'openid offline_access email transact'
};

const passportInstance = typeof window !== 'undefined' ? new passport.Passport(passportConfig) : undefined

export const MyContext = createContext();

export function MyProvider({ children }) {
  const [passportState] = useState(passportInstance);
  const [providerImx, setProviderImx] = useState(null)


  return (
    <MyContext.Provider value={{ providerImx, setProviderImx,  passportState }}>
      {children}
    </MyContext.Provider>
  );
}

export function useMyContext() {
  return useContext(MyContext);
}
