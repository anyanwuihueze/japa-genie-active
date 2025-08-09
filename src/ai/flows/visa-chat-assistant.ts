'use server';

/**
 * @fileOverview An AI chat assistant for visa application questions.
 *
 * - visaChatAssistant - A function that handles user questions about the visa application process.
 * - VisaChatAssistantInput - The input type for the visaChatAssistant function.
 * - VisaChatAssistantOutput - The return type for the visaChatAssistant function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import { generateStream } from 'genkit/generate';

const VisaChatAssistantInputSchema = z.object({
  question: z.string().describe('The user question about the visa application process.'),
});
export type VisaChatAssistantInput = z.infer<typeof VisaChatAssistantInputSchema>;

const prompt = ai.definePrompt({
  name: 'visaChatAssistantPrompt',
  input: {schema: VisaChatAssistantInputSchema},
  prompt: `You are a helpful AI assistant that answers questions about the visa application process.

  User Question: {{{question}}}
  `,
});

export async function visaChatAssistant(input: VisaChatAssistantInput) {
  const {stream} = await generateStream({
    prompt: prompt.prompt,
    input: input,
    model: 'googleai/gemini-2.0-flash',
  });

  return stream;
}
