const secrets = {
  AUTH0_AUDIENCE: import.meta.env.AUTH0_AUDIENCE,
  AUTH0_CLIENT_ID: import.meta.env.VITE_AUTH0_CLIENT_ID,
  AUTH0_CALLBACK_URL: import.meta.env.VITE_AUTH0_CALLBACK_URL,
  AUTH0_DOMAIN: import.meta.env.VITE_AUTH0_DOMAIN,
  API_SERVER_URL: import.meta.env.VITE_API_SERVER_URL,
}

export default secrets
