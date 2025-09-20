import { generateInsightsFlow } from "@/ai/flows/insights-flow";
import { appRoute } from "@genkit-ai/next";

export const POST = appRoute(generateInsightsFlow);
