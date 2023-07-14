import React from 'react'
import { AppState, Auth0Provider } from '@auth0/auth0-react'
import { useNavigate } from 'react-router-dom'
import config from '~/config/default'

interface AuthProviderProps extends React.PropsWithChildren {}

export default function AuthProvider({ children }: AuthProviderProps) {
  const navigate = useNavigate()

  const onRedirectCallback = (appState?: AppState) => {
    navigate(appState?.returnTo || window.location.pathname)
  }

  return (
    <Auth0Provider
      domain={config.auth0Domain}
      clientId={config.auth0ClientId}
      authorizationParams={{
        redirect_uri: config.auth0CallbackURL,
        audience: config.auth0Audience,
      }}
      onRedirectCallback={onRedirectCallback}
      useRefreshTokens={true}
      useRefreshTokensFallback={true}
      cacheLocation="localstorage"
    >
      {children}
    </Auth0Provider>
  )
}
