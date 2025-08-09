'use client';

import { useState } from 'react';
import ChatClient from './client';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Loader2, Sparkles, Link as LinkIcon, AlertCircle } from 'lucide-react';
import type { InsightOutput } from '@/ai/flows/insights-generator';
import Link from 'next/link';

function InsightsPlaceholder() {
    return (
        <CardContent>
            <p className="text-muted-foreground">
                As you chat, relevant insights and information will appear here. For example, if you ask about student visas for Canada, we might show you the top 5 universities, average tuition costs, and a link to the official application portal.
            </p>
        </CardContent>
    )
}

function InsightsLoading() {
    return (
        <CardContent className="flex flex-col items-center justify-center text-center text-muted-foreground space-y-4 h-64">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
            <p>Generating insights based on your question...</p>
        </CardContent>
    )
}

function InsightsContent({ insights }: { insights: InsightOutput | null }) {
    if (!insights || insights.insights.length === 0) {
        return (
             <CardContent className="flex flex-col items-center justify-center text-center text-muted-foreground space-y-4 h-64">
                <AlertCircle className="w-8 h-8 text-amber-500" />
                <p>No specific insights could be generated for that query. Try asking a more specific question about a country or visa type.</p>
            </CardContent>
        );
    }

    return (
        <CardContent className="space-y-4">
            {insights.insights.map((item, index) => (
                <div key={index} className="p-4 bg-primary/5 rounded-lg border border-primary/10">
                    <h3 className="font-bold text-foreground">{item.headline}</h3>
                    <p className="text-sm text-muted-foreground mt-1 mb-2">{item.detail}</p>
                    {item.url && (
                         <Link href={item.url} target="_blank" rel="noopener noreferrer" className="text-sm text-primary hover:underline flex items-center gap-1.5 font-medium">
                            <LinkIcon className="w-3.5 h-3.5" />
                            Learn More
                        </Link>
                    )}
                </div>
            ))}
        </CardContent>
    )
}

export default function ChatPage() {
  const [insights, setInsights] = useState<InsightOutput | null>(null);
  const [insightsLoading, setInsightsLoading] = useState(false);

  return (
    <div className="flex flex-col h-full">
      <header className="p-4 border-b">
        <h1 className="text-2xl font-bold tracking-tight">AI Chat Assistant</h1>
        <p className="text-sm text-muted-foreground">
          Ask me anything about the visa application process.
        </p>
      </header>
      <div className="flex-1 grid md:grid-cols-3 gap-8 p-4 overflow-hidden">
        <div className="md:col-span-2 h-full flex flex-col">
          <ChatClient 
             insights={insights}
             onNewInsights={setInsights}
             onInsightsLoading={setInsightsLoading}
          />
        </div>
        <div className="hidden md:flex flex-col gap-8">
          <Card className="flex-1 flex flex-col">
            <CardHeader className="flex flex-row items-center gap-2">
              <Sparkles className="w-5 h-5 text-primary" />
              <CardTitle className="text-xl">Insights</CardTitle>
            </CardHeader>
            {insightsLoading ? <InsightsLoading /> : (insights ? <InsightsContent insights={insights} /> : <InsightsPlaceholder />)}
          </Card>
        </div>
      </div>
    </div>
  );
}
