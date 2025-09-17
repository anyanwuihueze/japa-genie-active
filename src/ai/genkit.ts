import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';
import next from '@genkit-ai/next';

export const ai = genkit({
  plugins: [
    googleAI(),
    next({
      // These are required to prevent Genkit from creating its own Next.js server
      // in this project.
      api: 'disabled',
      ui: 'disabled',
    }),
  ],
});

export const geminiFlash = googleAI.model('gemini-1.5-flash-latest');
