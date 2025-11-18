'use server';

/**
 * @fileOverview This file implements the personalized product and course recommendation flow.
 *
 * The flow takes user's past browsing history and purchase activity as input and recommends
 * courses and products that the user is most likely to be interested in.
 *
 * @interface PersonalizedRecommendationsInput - The input type for the personalizedRecommendations function.
 * @interface PersonalizedRecommendationsOutput - The output type for the personalizedRecommendations function.
 * @function personalizedRecommendations - A function that returns personalized product and course recommendations for a user.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PersonalizedRecommendationsInputSchema = z.object({
  userId: z.string().describe('The ID of the user to generate recommendations for.'),
  browsingHistory: z.array(z.string()).describe('The user browsing history.'),
  purchaseHistory: z.array(z.string()).describe('The user purchase history.'),
});
export type PersonalizedRecommendationsInput = z.infer<
  typeof PersonalizedRecommendationsInputSchema
>;

const PersonalizedRecommendationsOutputSchema = z.object({
  recommendedProducts: z.array(z.string()).describe('The list of recommended products.'),
  recommendedCourses: z.array(z.string()).describe('The list of recommended courses.'),
});
export type PersonalizedRecommendationsOutput = z.infer<
  typeof PersonalizedRecommendationsOutputSchema
>;

export async function personalizedRecommendations(
  input: PersonalizedRecommendationsInput
): Promise<PersonalizedRecommendationsOutput> {
  return personalizedRecommendationsFlow(input);
}

const personalizedRecommendationsPrompt = ai.definePrompt({
  name: 'personalizedRecommendationsPrompt',
  input: {schema: PersonalizedRecommendationsInputSchema},
  output: {schema: PersonalizedRecommendationsOutputSchema},
  prompt: `You are an expert recommendation engine for an e-commerce platform that offers both products and courses.

  Based on the user's browsing history and purchase activity, recommend products and courses that the user is most likely to be interested in.

  User ID: {{{userId}}}
  Browsing History: {{#each browsingHistory}}{{{this}}}, {{/each}}
  Purchase History: {{#each purchaseHistory}}{{{this}}}, {{/each}}

  Products should be product listings on an e-commerce store.
  Courses should be educational courses, workshops, and tutorials.

  Return ONLY the list of recommended products and courses.
  `,
});

const personalizedRecommendationsFlow = ai.defineFlow(
  {
    name: 'personalizedRecommendationsFlow',
    inputSchema: PersonalizedRecommendationsInputSchema,
    outputSchema: PersonalizedRecommendationsOutputSchema,
  },
  async input => {
    const {output} = await personalizedRecommendationsPrompt(input);
    return output!;
  }
);
