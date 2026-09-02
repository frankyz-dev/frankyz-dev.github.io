import { defineCollection, z } from 'astro:content';
import { docsLoader } from '@astrojs/starlight/loaders';
import { docsSchema } from '@astrojs/starlight/schema';

export const collections = {
	docs: defineCollection({
		loader: docsLoader(),
		schema: docsSchema({
			extend: z.object({
				/**
				 * Runbook severity (SEV-1 … SEV-4). Optional; used on runbook
				 * pages. Starlight's built-in `lastUpdated` (date | boolean)
				 * is used on SOP pages and is part of the base schema.
				 */
				severity: z.enum(['SEV-1', 'SEV-2', 'SEV-3', 'SEV-4']).optional(),
			}),
		}),
	}),
};
