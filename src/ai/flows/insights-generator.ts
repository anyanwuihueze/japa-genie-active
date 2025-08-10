'use server';
/**
 * @fileOverview AI flow to generate contextual insights based on a user's query.
 *
 * - generateInsights - A function that generates insights based on a user's visa-related question.
 */

import {ai, geminiFlash} from '@/ai/genkit';
import {
  InsightInput,
  InsightInputSchema,
  InsightOutput,
  InsightOutputSchema,
} from '@/ai/schemas/insight-schemas';

export async function generateInsights(input: InsightInput): Promise<InsightOutput> {
  return generateInsightsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'insightsGeneratorPrompt',
  model: geminiFlash,
  input: {schema: InsightInputSchema},
  output: {schema: InsightOutputSchema},
  prompt: `You are an expert immigration analyst. Based on the user's question, your task is to generate a list of 3-5 highly relevant, actionable, and factual insights.

  For each insight, provide a clear headline and a concise detail. If there is a single, most-relevant official URL (e.g., an official government immigration site, a specific university application portal), include it. Do not include generic links.

  Additionally, you MUST generate the following structured data:
  1.  **Cost Estimates:** A breakdown of 3-5 key costs associated with the query (e.g., application fee, insurance, rent).
  2.  **Visa Alternatives:** A list of 2-3 alternative visa paths or related options.
  3.  **Chart Data:** Data for a simple bar chart comparing 3-5 relevant items. The chart should have a clear title and data points with names and numeric values. Example topics could be 'Cost of Living Comparison' or 'Visa Processing Times in Weeks'.

  User's Question: {{{question}}}

  Generate insights and all structured data that would be genuinely helpful for someone asking this question. Focus on facts, requirements, costs, or key considerations.
  `,
});

const generateInsightsFlow = ai.defineFlow(
  {
    name: 'generateInsightsFlow',
    inputSchema: InsightInputSchema,
    outputSchema: InsightOutputSchema,
  },
  async (input) => {
    const {output} = await prompt(input);
    if (!output) {
      throw new Error('Failed to generate insights. The AI model did not return a valid response.');
    }
    return output;
  }
);
