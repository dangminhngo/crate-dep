import { setupServer } from 'msw/node'

import { handlers } from './trpc-msw'

export const server = setupServer(...handlers)
