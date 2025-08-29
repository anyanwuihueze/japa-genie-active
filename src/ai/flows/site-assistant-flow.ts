'use server';
/**
 * @fileOverview An AI chat assistant for the Japa Genie website.
 *
 * This assistant answers questions about the Japa Genie service itself, such as its features, pricing, and how it works.
 * It is designed to guide users and encourage them to sign up or explore the platform.
 *
 * - siteAssistant - A function that handles user questions about the Japa Genie service.
 * - SiteAssistantInput - The input type for the siteAssistant function.
 * - SiteAssistantOutput - The return type for the siteAssistant function.
 */

import {ai, geminiFlash} from '@/ai/genkit';
import {z} from 'genkit';

const SiteAssistantInputSchema = z.object({
  question: z.string().describe('The user question about the Japa Genie service, its features, or pricing.'),
});
export type SiteAssistantInput = z.infer<typeof SiteAssistantInputSchema>;

const SiteAssistantOutputSchema = z.object({
  answer: z.string().describe('The answer to the user question.'),
});
export type SiteAssistantOutput = z.infer<typeof SiteAssistantOutputSchema>;

export async function siteAssistant(input: SiteAssistantInput): Promise<SiteAssistantOutput> {
  return siteAssistantFlow(input);
}

const prompt = ai.definePrompt({
  name: 'siteAssistantPrompt',
  model: geminiFlash,
  input: {schema: SiteAssistantInputSchema},
  output: {schema: SiteAssistantOutputSchema},
  prompt: `You are a friendly and helpful sales and support assistant for the Japa Genie website. "Japa" is a colloquial term for immigration or relocation, it has NO connection to the country Japan.
Your goal is to answer questions about the Japa Genie service, explain its value as a global visa assistance tool, and guide users to explore the features or sign up.

Your knowledge is limited to the Japa Genie platform. You do NOT answer questions about specific visa applications, immigration law, or personal travel plans. If a user asks a visa-related question, you should gently redirect them to use the main "AI Assistant" page for expert visa help.

Answer questions about:
- What Japa Genie is and how it helps with visa applications worldwide.
- The features available (e.g., Mock Interview, Document Checker, Progress Map).
- The pricing plans and what they include.
- The benefits of using the service.

Keep your answers concise, friendly, and encouraging. Always try to point the user toward a relevant page on the site, like '/pricing' or '/features'. Do NOT mention the country Japan.

User Question: {{{question}}}
`,
});

const siteAssistantFlow = ai.defineFlow(
  {
    name: 'siteAssistantFlow',
    inputSchema: SiteAssistantInputSchema,
    outputSchema: SiteAssistantOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    if (!output) {
      throw new Error('The AI model did not return a valid response.');
    }
    return output;
  }
);
