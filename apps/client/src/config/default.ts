const config = {
  auth0Audience: import.meta.env.VITE_AUTH0_AUDIENCE,
  auth0ClientId: import.meta.env.VITE_AUTH0_CLIENT_ID,
  auth0CallbackURL: import.meta.env.VITE_AUTH0_CALLBACK_URL,
  auth0Domain: import.meta.env.VITE_AUTH0_DOMAIN,
  apiServerURL: import.meta.env.VITE_API_SERVER_URL,
}

export default config
