import { defineCollection, z } from 'astro:content';

const Figure = z.object({
  name: z.string(),
  englishName: z.string().optional(),
  role: z.string(),
  years: z.string().optional(),
  bio: z.string(),
  image: z.string().optional(),
});

const Event = z.object({
  year: z.string(),
  name: z.string(),
  englishName: z.string().optional(),
  description: z.string(),
});

const AchievementItem = z.object({
  title: z.string(),
  description: z.string(),
  artifact: z.string().optional(),
  museum: z.string().optional(),
  image: z.string().optional(),
});

const dynastyCollection = defineCollection({
  type: 'content',
  schema: z.object({
    dynastySlug: z.string(),
    lang: z.enum(['zh', 'en']),
    title: z.string(),
    englishName: z.string(),
    period: z.string(),
    overview: z.string(),
    color: z.string().optional(),
    figures: z.array(Figure).optional(),
    events: z.array(Event).optional(),
    achievements: z.object({
      economy: z.array(AchievementItem).optional(),
      politics: z.array(AchievementItem).optional(),
      culture: z.array(AchievementItem).optional(),
    }).optional(),
  }),
});

export const collections = {
  dynasty: dynastyCollection,
};
