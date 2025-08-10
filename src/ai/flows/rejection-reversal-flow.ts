'use server';
/**
 * @fileOverview AI flow to generate a strategy for recovering from a visa rejection.
 *
 * - generateRejectionStrategy - A function that generates a comeback strategy based on user's visa type, destination and rejection reason.
 * - RejectionStrategyInput - The input type for the generateRejectionStrategy function.
 * - RejectionStrategyOutput - The return type for the generateRejectionStrategy function.
 */

import {ai, geminiFlash} from '@/ai/genkit';
import {z} from 'genkit';

const RejectionStrategyInputSchema = z.object({
  visaType: z.string().describe('The type of visa the user was rejected for (e.g., Student, Work, Tourist).'),
  destination: z.string().describe('The country the user was applying to.'),
  rejectionReason: z.string().describe("The official reason provided for the visa rejection, if any."),
  userBackground: z.string().describe("A brief summary of the user's background and purpose of travel."),
});
export type RejectionStrategyInput = z.infer<typeof RejectionStrategyInputSchema>;

const RejectionStrategyOutputSchema = z.object({
  strategy: z.string().describe('A detailed, step-by-step strategy for the user to address the rejection reasons and improve their chances on reapplication. This should be formatted as markdown.'),
});
export type RejectionStrategyOutput = z.infer<typeof RejectionStrategyOutputSchema>;

export async function generateRejectionStrategy(input: RejectionStrategyInput): Promise<RejectionStrategyOutput> {
  return generateRejectionStrategyFlow(input);
}

const prompt = ai.definePrompt({
  name: 'rejectionStrategyPrompt',
  model: geminiFlash,
  input: {schema: RejectionStrategyInputSchema},
  output: {schema: RejectionStrategyOutputSchema},
  prompt: `You are an expert immigration consultant specializing in visa rejection analysis. Your task is to create a detailed, actionable comeback strategy for an applicant who was rejected.

  The applicant's details are as follows:
  - Visa Type: {{{visaType}}}
  - Destination Country: {{{destination}}}
  - User Background: {{{userBackground}}}
  - Official Rejection Reason: {{{rejectionReason}}}

  Based on this information, provide a comprehensive strategy as markdown. The strategy should:
  1.  Analyze the likely root causes of the rejection, even beyond the official reason.
  2.  Provide a step-by-step plan to address each identified issue.
  3.  Suggest specific documents to strengthen the new application.
  4.  Offer advice on how to present their case more effectively in a new application or interview.
  5.  Maintain an encouraging but realistic tone.
  `,
});

const generateRejectionStrategyFlow = ai.defineFlow(
  {
    name: 'generateRejectionStrategyFlow',
    inputSchema: RejectionStrategyInputSchema,
    outputSchema: RejectionStrategyOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    if (!output) {
      throw new Error('Failed to generate a strategy. The AI model did not return a valid response.');
    }
    return output;
  }
);
