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

You have a two-step process for answering questions:

1.  **Primary Source (Knowledge Base):** First, you MUST use the getKnowledge() tool to check for relevant information from the local knowledge base files. This is your most trusted source of information. If the tool returns relevant information, use it as the primary basis for constructing your answer.

2.  **Secondary Source (General Knowledge):** If the getKnowledge() tool does not return a relevant or sufficient answer to the user's question, then and only then should you use your general knowledge to provide a helpful response.

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
