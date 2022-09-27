import z from 'zod';
// folder

export const createFolderSchema = z.object({
  title: z.string(),
});
export const deleteFolderSchema = z.object({
  id: z.string().cuid(),
});
export const updateFolderSchema = z.object({
  id: z.string().cuid(),
  title: z.string(),
});

//link
export const createLinkSchema = z.object({
  url: z.string(),
  title: z.string(),
  type: z.string(),
  folderId: z.string().cuid(),
});

export type createLinkInput = z.TypeOf<typeof createLinkSchema>;

export const deleteLinkSchema = z.object({
  id: z.string().cuid(),
});

export const updateLinkSchema = z.object({
  id: z.string().cuid(),
  url: z.string(),
  title: z.string(),
  type: z.string(),
  folderId: z.string().cuid(),
});

export type updateLinkInput = z.TypeOf<typeof updateLinkSchema>;
