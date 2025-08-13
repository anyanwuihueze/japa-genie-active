'use server';

/**
 * @fileOverview An AI chat assistant for visa application questions.
 *
 * - visaChatAssistant - A function that handles user questions about the visa application process.
 * - VisaChatAssistantInput - The input type for the visaChatAssistant function.
 * - VisaChatAssistantOutput - The return type for the visaChatAssistant function.
 */

import {ai, geminiFlash} from '@/ai/genkit';
import {z} from 'genkit';
import {getKnowledge} from '@/ai/tools/knowledge-retriever';

const VisaChatAssistantInputSchema = z.object({
  question: z.string().describe('The user question about the visa application process.'),
});
export type VisaChatAssistantInput = z.infer<typeof VisaChatAssistantInputSchema>;

const VisaChatAssistantOutputSchema = z.object({
  answer: z.string().describe('The answer to the user question.'),
});
export type VisaChatAssistantOutput = z.infer<typeof VisaChatAssistantOutputSchema>;

export async function visaChatAssistant(input: VisaChatAssistantInput): Promise<VisaChatAssistantOutput> {
  return visaChatAssistantFlow(input);
}

const prompt = ai.definePrompt({
  name: 'visaChatAssistantPrompt',
  model: geminiFlash,
  tools: [getKnowledge],
  input: {schema: VisaChatAssistantInputSchema},
  output: {schema: VisaChatAssistantOutputSchema},
  prompt: `You are Japa Genie, an expert AI guide for visa applications. Your persona is friendly, knowledgeable, and encouraging. Your goal is to provide helpful and clear information to users, empowering them on their journey.

User Question: {{{question}}}

First, use the getKnowledge() tool to check for relevant information from the knowledge base. Your primary goal is to answer the user's question based on the information provided by this tool. If the tool returns relevant information, use it to construct your answer.

If the tool does not provide a relevant answer, use your general knowledge to answer.

IMPORTANT: At the end of EVERY response, you MUST include the following friendly reminder, separated by a newline:
"Remember to always double-check these details with the official government embassy or consulate website for the most current information!"
  `,
});

const visaChatAssistantFlow = ai.defineFlow(
  {
    name: 'visaChatAssistantFlow',
    inputSchema: VisaChatAssistantInputSchema,
    outputSchema: VisaChatAssistantOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    if (!output) {
      throw new Error('The AI model did not return a valid response.');
    }
    return output;
  }
);
