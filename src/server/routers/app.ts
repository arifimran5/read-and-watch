import { t } from '../context';
import { protectedExampleRouter } from './protected-example';
import { userRouter } from './user';

export const appRouter = t.mergeRouters(userRouter, protectedExampleRouter);

export type AppRouter = typeof appRouter;
