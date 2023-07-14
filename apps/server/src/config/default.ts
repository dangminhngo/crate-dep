import path from 'path'
import dotenv from 'dotenv'

dotenv.config({
  path:
    process.env.NODE_ENV === 'development'
      ? path.resolve(__dirname, '../.env.local')
      : path.resolve(__dirname, '../.env'),
})

interface Config {
  port: number
  clientOriginUrl: string
  auth0Audience: string
  auth0Domain: string
  auth0ManagementApiToken: string
}

const config: Config = {
  port: Number(process.env.PORT) || 3001,
  clientOriginUrl: process.env.CLIENT_ORIGIN_URL as string,
  auth0Audience: process.env.AUTH0_AUDIENCE as string,
  auth0Domain: process.env.AUTH0_DOMAIN as string,
  auth0ManagementApiToken: process.env.AUTH0_MANAGEMENT_API_TOKEN as string,
}

export default config
