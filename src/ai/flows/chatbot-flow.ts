
'use server';

/**
 * @fileOverview This file defines a Genkit flow for a conversational chatbot.
 * The flow can answer questions about products and courses on the platform.
 *
 * @exports {
 *   chatbot: (input: ChatbotInput) => Promise<ChatbotOutput>;
 *   ChatbotInput: type of the input schema
 *   ChatbotOutput: type of the output schema
 * }
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const ChatbotInputSchema = z.object({
  query: z.string().describe('The user\'s message to the chatbot.'),
});
export type ChatbotInput = z.infer<typeof ChatbotInputSchema>;

const ChatbotOutputSchema = z.object({
  reply: z.string().describe('The chatbot\'s response to the user.'),
});
export type ChatbotOutput = z.infer<typeof ChatbotOutputSchema>;

export async function chatbot(input: ChatbotInput): Promise<ChatbotOutput> {
  return chatbotFlow(input);
}

const chatbotPrompt = ai.definePrompt({
  name: 'chatbotPrompt',
  input: { schema: ChatbotInputSchema },
  output: { schema: ChatbotOutputSchema },
  system: `You are a friendly and helpful assistant for an e-commerce and learning platform called Learn & Shop.
  Your goal is to help users find products and courses.
  Be conversational and concise in your responses.
  If you don't know the answer, say that you are unable to help with that request.
  
  The platform sells products like 'Ergonomic Chair', 'Wireless Keyboard', and '4K Monitor'.
  The platform offers courses like 'Intro to Web Development', 'Advanced React Patterns', and 'Digital Marketing Masterclass'.
  
  Answer the user's query based on this context.`,
  prompt: `User query: {{{query}}}`,
});


const chatbotFlow = ai.defineFlow(
  {
    name: 'chatbotFlow',
    inputSchema: ChatbotInputSchema,
    outputSchema: ChatbotOutputSchema,
  },
  async (input) => {
    const { output } = await chatbotPrompt(input);
    return output!;
  }
);

    