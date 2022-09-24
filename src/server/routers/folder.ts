import { t, protectedRouter } from '../context';
import {
  createFolderSchema,
  deleteFolderSchema,
  updateFolderSchema,
} from '@/types/link';

export const folderRouter = t.router({
  // get all folder route
  getAllFolders: protectedRouter.query(async ({ ctx }) => {
    return await ctx.prisma?.folder.findMany();
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
