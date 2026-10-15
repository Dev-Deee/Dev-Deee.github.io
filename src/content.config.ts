import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const link = z.object({
  label: z.string(),
  url: z.string().url(),
});

const projects = defineCollection({
  // Every .md file in src/content/projects becomes a page at /projects/<file-name>.
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    summary: z.string().max(160),
    year: z.number().int(),
    language: z.enum(['Java', 'Go', 'Python', 'JavaScript', 'TypeScript']),
    tags: z.array(z.string()).default([]),
    stack: z.array(z.string()).default([]),
    // Featured projects appear first on the home page, sorted by `order`.
    featured: z.boolean().default(false),
    order: z.number().default(100),
    repo: z.string().url(),
    // Extra repositories, e.g. one per microservice.
    repos: z.array(link).default([]),
    demo: z.string().url().optional(),
    docs: z.string().url().optional(),
    links: z.array(link).default([]),
    draft: z.boolean().default(false),
  }),
});

export const collections = { projects };
