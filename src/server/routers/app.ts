import { t } from '../context';
import { folderRouter } from './folder';
import { linkRouter } from './link';

export const appRouter = t.mergeRouters(folderRouter, linkRouter);

export type AppRouter = typeof appRouter;
