import { protectedRouter, t } from '../context';

export const protectedExampleRouter = t.router({
  protected_hello: protectedRouter.query(({ ctx }) => {
    return {
      message: 'Hello I am from protected route',
    };
  }),
});
