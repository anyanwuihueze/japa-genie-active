'use client';

import { useState } from 'react';
import ChatClient from './client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, Sparkles, Link as LinkIcon, AlertCircle, BarChart, FileText, Repeat } from 'lucide-react';
import type { InsightOutput } from '@/ai/schemas/insight-schemas';
import Link from 'next/link';
import { Bar, BarChart as RechartsBarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';

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
        <CardContent className="flex flex-col items-center justify-center text-center text-muted-foreground space-y-4 h-full">
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

    const { costEstimates, visaAlternatives, chartData } = insights;

    return (
        <CardContent className="space-y-6 p-4">
            {chartData && chartData.data.length > 0 && (
                 <div className="p-4 bg-primary/5 rounded-lg border border-primary/10">
                    <h3 className="font-bold text-foreground flex items-center gap-2 mb-2"> <BarChart className="w-5 h-5" /> {chartData.title}</h3>
                    <div className="h-48 w-full">
                         <ResponsiveContainer width="100%" height="100%">
                            <RechartsBarChart data={chartData.data}>
                                <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                                <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value}`} />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: 'hsl(var(--background))',
                                        borderColor: 'hsl(var(--border))',
                                        borderRadius: 'var(--radius)',
                                    }}
                                />
                                <Bar dataKey="value" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                            </RechartsBarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            )}

            {costEstimates && costEstimates.length > 0 && (
                <div className="p-4 bg-primary/5 rounded-lg border border-primary/10">
                    <h3 className="font-bold text-foreground flex items-center gap-2 mb-2"> <FileText className="w-5 h-5" /> Cost Estimates</h3>
                    <ul className="space-y-2">
                        {costEstimates.map((item, index) => (
                            <li key={index} className="flex justify-between items-center text-sm">
                                <span className="text-muted-foreground">{item.item}</span>
                                <span className="font-medium text-foreground">{new Intl.NumberFormat('en-US', { style: 'currency', currency: item.currency }).format(item.cost)}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {visaAlternatives && visaAlternatives.length > 0 && (
                <div className="p-4 bg-primary/5 rounded-lg border border-primary/10">
                    <h3 className="font-bold text-foreground flex items-center gap-2 mb-2"> <Repeat className="w-5 h-5" /> Visa Alternatives</h3>
                     <ul className="space-y-3">
                        {visaAlternatives.map((item, index) => (
                            <li key={index} className="text-sm">
                                <p className="font-semibold text-foreground">{item.visaName}</p>
                                <p className="text-muted-foreground">{item.description}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

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
      <header className="p-4 border-b shrink-0">
        <h1 className="text-2xl font-bold tracking-tight">AI Chat Assistant</h1>
        <p className="text-sm text-muted-foreground">
          Ask me anything about the visa application process.
        </p>
      </header>
      <div className="flex-1 grid md:grid-cols-3 overflow-hidden">
        {/* Chat Pane */}
        <div className="md:col-span-2 h-full flex flex-col">
          <ChatClient 
             insights={insights}
             onNewInsights={setInsights}
             onInsightsLoading={setInsightsLoading}
          />
        </div>
        {/* Insights Pane */}
        <div className="hidden md:flex flex-col h-full overflow-y-auto">
           <Card className="flex-1 flex flex-col h-full">
             <CardHeader className="flex flex-row items-center gap-2 shrink-0">
                <Sparkles className="w-5 h-5 text-primary" />
                <CardTitle className="text-xl">Insights</CardTitle>
            </CardHeader>
            <div className="flex-1 overflow-y-auto">
              {insightsLoading ? <InsightsLoading /> : (insights ? <InsightsContent insights={insights} /> : <InsightsPlaceholder />)}
            </div>
           </Card>
        </div>
      </div>
    </div>
  );
}
