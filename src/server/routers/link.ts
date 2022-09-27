import { t, protectedRouter } from '../context';
import {
  createLinkSchema,
  deleteLinkSchema,
  updateLinkSchema,
} from '@/types/link';
import { z } from 'zod';

export const linkRouter = t.router({
  // get all link route
  getAllLinks: protectedRouter
    .input(
      z.object({
        id: z.string().cuid(),
      })
    )
    .query(async ({ ctx, input }) => {
      if (input.id) {
        return await ctx.prisma?.link.findMany({
          where: { folderId: input.id },
          orderBy: {
            createdAt: 'desc',
          },
        });
      }
    }),
  // create link route
  createLink: protectedRouter.input(createLinkSchema).mutation(
    async ({ ctx, input }) =>
      await ctx.prisma?.link.create({
        data: {
          url: input.url,
          title: input.title,
          type: input.type,
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
          type: input.type,
          folderId: input.folderId,
        },
      })
  ),
  //delete link route
  deleteLink: protectedRouter
    .input(deleteLinkSchema)
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma?.link.delete({
        where: {
          id: input.id,
        },
      });
    }),

  //end
});
