import { protectedProcedure, publicProcedure, router } from '../trpc'

export const userRouter = router({
  list: publicProcedure.query(() => []),
  protectedList: protectedProcedure.query(({ ctx }) => {
    return {
      user: ctx.user,
    }
  }),
})
