import { protectedProcedure, publicProcedure, router } from '../trpc'

export const userRouter = router({
  list: publicProcedure.query(() => []),
  create: protectedProcedure.query(({ ctx }) => {
    return {
      user: ctx.user,
    }
  }),
})
