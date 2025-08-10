/**
 * @fileOverview Schemas and types for the insights generator flow.
 *
 * - InsightInput - The input type for the generateInsights function.
 * - InsightOutput - The return type for the generateInsights function.
 * - InsightInputSchema - The Zod schema for the input.
 * - InsightOutputSchema - The Zod schema for the output.
 */

import {z} from 'genkit';

export const InsightInputSchema = z.object({
  question: z.string().describe("The user's question about their visa or travel plans."),
});
export type InsightInput = z.infer<typeof InsightInputSchema>;

export const InsightOutputSchema = z.object({
    insights: z.array(z.object({
        headline: z.string().describe("The key insight or topic header."),
        detail: z.string().describe("A detailed explanation or data point for the insight."),
        url: z.string().url().optional().describe("An optional, highly relevant URL for the user to learn more."),
    })).describe("A list of 3-5 key insights related to the user's question.")
});
export type InsightOutput = z.infer<typeof InsightOutputSchema>;
