
import { appRoute } from '@genkit-ai/next';
import { siteAssistantFlow } from '@/ai/flows/site-assistant-flow';

// This new API route is dedicated to the visitor chat.
// It directly uses the siteAssistantFlow, which contains the correct personality and logic for new visitors.
export const POST = appRoute(siteAssistantFlow);
