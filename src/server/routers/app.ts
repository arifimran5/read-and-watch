import { t } from '../context';
import { folderRouter } from './folder';
import { linkRouter } from './link';
import { userRouter } from './user';

export const appRouter = t.mergeRouters(userRouter, folderRouter, linkRouter);

export type AppRouter = typeof appRouter;
