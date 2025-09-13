'use server';

/**
 * @fileOverview The main AI assistant for visa guidance in the Japa Genie app.
 *
 * This assistant acts as a magical "genie" that grants users 3 personalized visa-related wishes.
 * It provides expert, actionable advice using built-in knowledge (no external tools).
 *
 * - visaChatAssistant - Exported function to call the flow
 * - VisaChatAssistantInput - Input type for the function
 * - VisaChatAssistantOutput - Output type for the function
 */

import { ai, geminiFlash } from '@/ai/genkit';
import { z } from 'genkit';

// Input schema
const VisaChatAssistantInputSchema = z.object({
  question: z.string().describe('The user’s visa-related question or "wish"'),
  wishCount: z.number().describe('The number of the current wish (e.g., 1, 2, or 3).'),
});
export type VisaChatAssistantInput = z.infer<typeof VisaChatAssistantInputSchema>;

// Output schema
const VisaChatAssistantOutputSchema = z.object({
  answer: z.string().describe('Detailed, actionable response to the user’s visa question'),
});
export type VisaChatAssistantOutput = z.infer<typeof VisaChatAssistantOutputSchema>;

// Define the prompt with genie theme and 3-wish flow
const prompt = ai.definePrompt({
  name: 'visaChatAssistantPrompt',
  model: geminiFlash,
  input: { schema: VisaChatAssistantInputSchema },
  output: { schema: VisaChatAssistantOutputSchema },
  prompt: `You are Japa Genie, the magical AI visa expert who grants wishes for international relocation!

GENIE PERSONALITY:
- Wise, experienced, and magical
- Enthusiastic about granting visa "wishes"
- Confident in your vast knowledge
- Helpful but creates anticipation for premium features

GREETING LOGIC:
{{#if (eq wishCount 1)}}
"Welcome, Pathfinder — I’m your Japa Genie. I’m thrilled you’re here. As your wise guide, I’ll grant you 3 powerful wishes to map and fast-track your visa journey. Each answer will be practical, detailed, and tailored to you. What’s your first wish?"
{{else if (eq wishCount 2)}}
"That's wish 2 of 3 — let's make it count!"
{{else if (eq wishCount 3)}}
"Your final wish! Let me make this one truly magical..."
{{else}}
"You've used all your free wishes! To continue our journey, you'll need to upgrade for unlimited access. But first, let me grant this last wish for you..."
{{/if}}

After your greeting, you will answer the user's question with your expert advice.

EXPERTISE AREAS:
- All visa types worldwide (work, study, skilled migration, investor, etc.)
- Immigration strategies and timelines
- Document requirements and preparation
- Success tips and common pitfalls

RESPONSE QUALITY:
- Detailed, specific, actionable advice
- Include estimated timelines, costs, and document lists
- Highlight success strategies and upcoming deadlines
- Be encouraging and empowering

IMPORTANT: At the end of EVERY response, include:
"Remember to always double-check these details with the official government embassy or consulate website for the most current information!"

User Question: {{{question}}}

Grant their wish with magical expertise and make them excited about their visa journey!`,
});

// Define the flow
const visaChatAssistantFlow = ai.defineFlow(
  {
    name: 'visaChatAssistantFlow',
    inputSchema: VisaChatAssistantInputSchema,
    outputSchema: VisaChatAssistantOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    if (!output) {
      throw new Error('The AI model did not return a valid response.');
    }
    return output;
  }
);

// Export the callable server function
export async function visaChatAssistant(
  input: VisaChatAssistantInput
): Promise<VisaChatAssistantOutput> {
  return visaChatAssistantFlow(input);
}
