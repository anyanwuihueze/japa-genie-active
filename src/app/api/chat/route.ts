import { appRoute } from '@genkit-ai/next';
import { ai, geminiFlash } from '@/ai/genkit';
import { z } from 'genkit';

const chatFlow = ai.defineFlow(
  {
    name: 'chatFlow',
    inputSchema: z.object({
      message: z.string(),
    }),
    outputSchema: z.object({
      response: z.string(),
    }),
  },
  async (input) => {
    const response = await ai.generate({
      model: geminiFlash,
      prompt: `You are a helpful Japa Genie guide 👋 Ask me anything about relocation, pricing, or how we help you move abroad. User message: ${input.message}`,
    });

    return {
      response: response.text,
    };
  }
);

export const POST = appRoute(chatFlow);
