'use server';
/**
 * @fileOverview AI flow to generate personalized insights regarding visa options, estimated costs, and approval chances.
 *
 * - generateVisaInsights - A function that generates visa insights based on user profile, background, and intended destination.
 * - VisaInsightsInput - The input type for the generateVisaInsights function.
 * - VisaInsightsOutput - The return type for the generateVisaInsights function.
 */

import {ai, geminiFlash} from '@/ai/genkit';
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
  ).describe('Array of at least 3 potential visa options with costs, approval chances and processing times.'),
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
  model: geminiFlash,
  input: {schema: VisaInsightsInputSchema},
  output: {schema: VisaInsightsOutputSchema},
  prompt: `You are an expert AI visa consultant. Your task is to provide personalized visa insights based on the user's profile, intended destination, and budget.

  Analyze the provided information and generate a structured response with the following components:

  1. "visaOptions": Create a JSON array of at least three potential visa options. For each option, include:
      - "visaType" (string): The specific name of the visa (e.g., "Express Entry - Federal Skilled Worker", "Student Permit", "Intra-Company Transfer Visa").
      - "estimatedCost" (number): The estimated total cost for this visa type in USD.
      - "approvalChance" (number): A realistic estimated approval percentage (from 0 to 100).
      - "processingTime" (string): The estimated time it will take to process this visa (e.g., "6-8 months", "12-18 months").

  2. "costEstimates": Create a JSON object detailing the estimated costs. This should include:
      - "applicationFees" (number): Estimated government application fees in USD.
      - "legalFees" (number): Estimated fees for legal assistance, if applicable, in USD.
      - "otherExpenses" (number): Other potential expenses like biometrics, medical exams, and travel in USD.
      - "totalCost" (number): The sum of all estimated costs in USD.

  3. "insightsSummary": Write a concise summary of the user's profile. Highlight their strengths and suggest the most promising visa paths based on their qualifications and budget.

  User Information:
  - Profile: {{{profile}}}
  - Destination: {{{destination}}}
  - Budget (USD): {{{budget}}}

  Provide a realistic and helpful analysis to guide the user's visa application journey.
  `,
  config: {
    safetySettings: [
      {
        category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
        threshold: 'BLOCK_NONE',
      },
      {
        category: 'HARM_CATEGORY_HARASSMENT',
        threshold: 'BLOCK_NONE',
      },
    ],
  },
});

const generateVisaInsightsFlow = ai.defineFlow(
  {
    name: 'generateVisaInsightsFlow',
    inputSchema: VisaInsightsInputSchema,
    outputSchema: VisaInsightsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    if (!output) {
      throw new Error('Failed to generate visa insights. The AI model did not return a valid response.');
    }
    return output;
  }
);
