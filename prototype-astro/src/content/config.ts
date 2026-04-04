import { defineCollection, z } from 'astro:content';

const dynastyCollection = defineCollection({
  type: 'content',
  schema: z.object({
    dynastySlug: z.string(),
    lang: z.enum(['zh', 'en']),
    title: z.string(),          // Chinese name e.g. "唐"
    englishName: z.string(),    // English name e.g. "Tang Dynasty"
    period: z.string(),         // Display period e.g. "618–907"
    overview: z.string(),       // Short summary (shown in hero)
    color: z.string().optional(),
  }),
});

export const collections = {
  dynasty: dynastyCollection,
};
