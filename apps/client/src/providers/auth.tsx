import React from 'react'
import { AppState, Auth0Provider } from '@auth0/auth0-react'
import { useNavigate } from 'react-router-dom'

import secrets from '@/lib/secrets'

interface AuthProviderProps extends React.PropsWithChildren {}

export default function AuthProvider({ children }: AuthProviderProps) {
  const navigate = useNavigate()

  const onRedirectCallback = (appState?: AppState) => {
    navigate(appState?.returnTo || window.location.pathname)
  }

  if (
    !(
      secrets.AUTH0_DOMAIN &&
      secrets.AUTH0_CLIENT_ID &&
      secrets.AUTH0_CALLBACK_URL
    )
  ) {
    return null
  }

  return (
    <Auth0Provider
      domain={secrets.AUTH0_DOMAIN}
      clientId={secrets.AUTH0_CLIENT_ID}
      authorizationParams={{ redirect_uri: secrets.AUTH0_CALLBACK_URL }}
      onRedirectCallback={onRedirectCallback}
    >
      {children}
    </Auth0Provider>
  )
}
