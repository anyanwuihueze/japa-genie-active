'use server';
/**
 * @fileOverview AI flow to generate personalized insights regarding visa options, estimated costs, and approval chances.
 *
 * - generateVisaInsights - A function that generates visa insights based on user profile, background, and intended destination.
 * - VisaInsightsInput - The input type for the generateVisaInsights function.
 * - VisaInsightsOutput - The return type for the generateVisaInsights function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const VisaInsightsInputSchema = z.object({
  profile: z.string().describe('User profile information including background, education, and work experience.'),
  destination: z.string().describe('Intended destination country for the visa application.'),
  budget: z.number().describe('The budget the user has available for the visa application process in USD.'),
});
export type VisaInsightsInput = z.infer<typeof VisaInsightsInputSchema>;

const VisaInsightsOutputSchema = z.object({
  visaOptions: z.array(
    z.object({
      visaType: z.string().describe('Type of visa.'),
      estimatedCost: z.number().describe('Estimated cost of the visa in USD.'),
      approvalChance: z.number().describe('Estimated approval chance (0-100).'),
      processingTime: z.string().describe('Estimated processing time (e.g., months).'),
    })
  ).describe('Array of potential visa options with costs, approval chances and processing times.'),
  costEstimates: z.object({
    applicationFees: z.number().describe('Estimated application fees in USD.'),
    legalFees: z.number().describe('Estimated legal fees in USD.'),
    otherExpenses: z.number().describe('Other potential expenses (e.g., travel, accommodation) in USD.'),
    totalCost: z.number().describe('Total estimated cost in USD.'),
  }).describe('Detailed cost estimates for the visa application process.'),
  insightsSummary: z.string().describe('A summary of the user profile with suggestions on visa paths forward.'),
});
export type VisaInsightsOutput = z.infer<typeof VisaInsightsOutputSchema>;

export async function generateVisaInsights(input: VisaInsightsInput): Promise<VisaInsightsOutput> {
  return generateVisaInsightsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'visaInsightsPrompt',
  input: {schema: VisaInsightsInputSchema},
  output: {schema: VisaInsightsOutputSchema},
  prompt: `You are an AI assistant designed to provide personalized visa insights based on user information.

  Analyze the user's profile, intended destination, and budget to generate the following:

  - visaOptions: A list of potential visa options for the user, including the visa type, estimated cost in USD, estimated approval chance (0-100), and estimated processing time.
  - costEstimates: Detailed cost estimates for the visa application process, including application fees, legal fees, other potential expenses, and the total estimated cost in USD.
  - insightsSummary: A summary of the user profile with suggestions on visa paths forward.

  User Profile: {{{profile}}}
  Destination: {{{destination}}}
  Budget: {{{budget}}}

  Ensure that the visaOptions array contains at least 3 options.  The estimated costs should be realistic based on the type of visa.
  `,
});

const generateVisaInsightsFlow = ai.defineFlow(
  {
    name: 'generateVisaInsightsFlow',
    inputSchema: VisaInsightsInputSchema,
    outputSchema: VisaInsightsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
