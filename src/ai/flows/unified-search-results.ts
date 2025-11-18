'use server';

/**
 * @fileOverview This file defines a Genkit flow for unified search across products and courses.
 *
 * The flow uses AI to determine whether the search query is more relevant to products, courses, or both,
 * and returns the most relevant results.
 *
 * @exports {
 *   unifiedSearch: (input: UnifiedSearchInput) => Promise<UnifiedSearchOutput>;
 *   UnifiedSearchInput: type of the input schema
 *   UnifiedSearchOutput: type of the output schema
 * }
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const UnifiedSearchInputSchema = z.object({
  query: z.string().describe('The user search query.'),
});
export type UnifiedSearchInput = z.infer<typeof UnifiedSearchInputSchema>;

const SearchResultSchema = z.object({
  type: z.enum(['product', 'course']).describe('The type of search result.'),
  id: z.string().describe('The ID of the product or course.'),
  title: z.string().describe('The title of the product or course.'),
  description: z.string().describe('A brief description of the product or course.'),
  imageUrl: z.string().optional().describe('URL of image representing the result.'),
});

const UnifiedSearchOutputSchema = z.object({
  results: z.array(SearchResultSchema).describe('An array of search results.'),
});
export type UnifiedSearchOutput = z.infer<typeof UnifiedSearchOutputSchema>;

export async function unifiedSearch(input: UnifiedSearchInput): Promise<UnifiedSearchOutput> {
  return unifiedSearchFlow(input);
}

const unifiedSearchPrompt = ai.definePrompt({
  name: 'unifiedSearchPrompt',
  input: {schema: UnifiedSearchInputSchema},
  output: {schema: UnifiedSearchOutputSchema},
  prompt: `You are a search assistant that helps users find products and courses.
  Given the user's query, determine whether the query is more relevant to products, courses, or both.
  Return an array of search results, each with a type (product or course), id, title, and description.

  Query: {{{query}}}
  `,
});

const unifiedSearchFlow = ai.defineFlow(
  {
    name: 'unifiedSearchFlow',
    inputSchema: UnifiedSearchInputSchema,
    outputSchema: UnifiedSearchOutputSchema,
  },
  async input => {
    // TODO: Implement actual search logic here, e.g. by calling services in src/services/*.ts
    // This is just a placeholder that returns dummy data.
    const {output} = await unifiedSearchPrompt(input);

    // Ensure that 'output' is not null or undefined before returning it.
    if (!output) {
      throw new Error('No output from unifiedSearchPrompt');
    }

    // Placeholder results (replace with actual search implementation later)
    const placeholderResults: UnifiedSearchOutput = {
      results: [
        {
          type: 'product',
          id: 'product1',
          title: 'Awesome Product',
          description: 'This is an awesome product.',
          imageUrl: 'https://example.com/product1.jpg',
        },
        {
          type: 'course',
          id: 'course1',
          title: 'Amazing Course',
          description: 'This is an amazing course.',
          imageUrl: 'https://example.com/course1.jpg',
        },
      ],
    };

    return placeholderResults; // Replace with actual results
  }
);
