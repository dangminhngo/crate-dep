import dotenv from 'dotenv'

dotenv.config({
  path: process.env.NODE_ENV == 'development' ? '.env.local' : '.env',
})

interface Config {
  port: number
  clientOriginUrl: string
  auth0Audience: string
  auth0Domain: string
}

const config: Config = {
  port: Number(process.env.PORT) ?? 8080,
  clientOriginUrl: process.env.CLIENT_ORIGIN_URL as string,
  auth0Audience: process.env.AUTH0_AUDIENCE as string,
  auth0Domain: process.env.AUTH0_DOMAIN as string,
}

export default config
