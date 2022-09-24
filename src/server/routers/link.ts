import { t, protectedRouter } from '../context';
import {
  createLinkSchema,
  deleteLinkSchema,
  updateLinkSchema,
} from '@/types/link';

export const linkRouter = t.router({
  // get all link route
  getAllLinks: protectedRouter.query(async ({ ctx }) => {
    return await ctx.prisma?.link.findMany();
  }),
  // create link route
  createLink: protectedRouter.input(createLinkSchema).mutation(
    async ({ ctx, input }) =>
      await ctx.prisma?.link.create({
        data: {
          url: input.url,
          title: input.title,
          folderId: input.folderId,
        },
      })
  ),
  // update link route
  updateLink: protectedRouter.input(updateLinkSchema).mutation(
    async ({ ctx, input }) =>
      await ctx.prisma?.link.update({
        where: {
          id: input.id,
        },
        data: {
          url: input.url,
          title: input.title,
          folderId: input.folderId,
        },
      })
  ),
  //delete link route
  deleteLink: protectedRouter
    .input(deleteLinkSchema)
    .query(async ({ ctx, input }) => {
      return await ctx.prisma?.link.delete({
        where: {
          id: input.id,
        },
      });
    }),

  //end
});
