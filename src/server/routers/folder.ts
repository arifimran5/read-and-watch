import { t, protectedRouter } from '../context';
import {
  createFolderSchema,
  deleteFolderSchema,
  updateFolderSchema,
} from '@/types/link';
import { z } from 'zod';

export const folderRouter = t.router({
  // get all folder route
  getAllFolders: protectedRouter.query(async ({ ctx }) => {
    return await ctx.prisma?.folder.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }),
  // create folder route
  createFolder: protectedRouter.input(createFolderSchema).mutation(
    async ({ ctx, input }) =>
      await ctx.prisma?.folder.create({
        data: {
          title: input.title,
          User: {
            connect: {
              id: ctx.session.user.id,
            },
          },
        },
      })
  ),
  // get folder by id route
  getFolderById: protectedRouter
    .input(z.object({ id: z.string().cuid() }))
    .query(async ({ ctx, input }) => {
      return await ctx.prisma?.folder.findUnique({
        where: {
          id: input.id,
        },
      });
    }),
  // update folder route
  updateFolder: protectedRouter.input(updateFolderSchema).mutation(
    async ({ ctx, input }) =>
      await ctx.prisma?.folder.update({
        where: {
          id: input.id,
        },
        data: {
          title: input.title,
        },
      })
  ),
  //delete folder route
  deleteFolder: protectedRouter
    .input(deleteFolderSchema)
    .mutation(async ({ ctx, input }) => {
      await ctx.prisma?.folder.delete({
        where: {
          id: input.id,
        },
      });
    }),

  //end
});
