import { appRoute } from '@genkit-ai/next';
import { visaChatAssistantFlow } from '@/ai/flows/visa-chat-assistant';

// Wire the API route to the correct, persona-driven flow
export const POST = appRoute(visaChatAssistantFlow);
