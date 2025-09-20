'use client';

import { useState, useRef, useEffect } from 'react';
import { runFlow } from '@genkit-ai/next/client';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import type { InsightOutput } from '@/ai/schemas/insight-schemas';
import type { VisaChatAssistantOutput } from '@/ai/flows/visa-chat-assistant';
import { Badge } from '@/components/ui/badge';

const MAX_WISHES = 3;

export default function UserChat() {
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant'; content: string }[]>([
    {
      role: 'assistant',
      content: "Welcome, Pathfinder! I'm Japa Genie, your magical guide to global relocation. I can grant you 3 powerful wishes to map out your visa journey. What is your first wish?",
    }
  ]);
  const [insights, setInsights] = useState<InsightOutput | null>(null);
  const [currentInput, setCurrentInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isInsightsLoading, setIsInsightsLoading] = useState(false);
  const [wishCount, setWishCount] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = currentInput.trim();
    if (!trimmed || isTyping) return;

    const newWishCount = wishCount + 1;
    setWishCount(newWishCount);

    const userMessage = { role: 'user' as const, content: trimmed };
    // Clear initial welcome message on first user message
    if (newWishCount === 1 && messages.length === 1) {
        setMessages([userMessage]);
    } else {
        setMessages((prev) => [...prev, userMessage]);
    }
    setCurrentInput('');
    setIsTyping(true);
    setIsInsightsLoading(true);

    try {
      // Get chat response using the new API route
      const chatResult: VisaChatAssistantOutput = await runFlow({
        url: '/api/chat',
        input: { 
          question: trimmed,
          wishCount: newWishCount,
         }
      });

      const aiResponse = chatResult.answer;
      setMessages((prev) => [...prev, { role: 'assistant', content: aiResponse }]);

      // Generate insights using API route
      const insightsResult = await runFlow({
        url: '/api/insights',
        input: { question: trimmed }
      });
      setInsights(insightsResult);

    } catch (err) {
      console.error("Chat error:", err);
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: 'Oops! Something went wrong. Please check your connection and try again.',
        },
      ]);
      setInsights(null);
    } finally {
      setIsTyping(false);
      setIsInsightsLoading(false);
    }
  };

  const wishesLeft = MAX_WISHES - wishCount;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 h-[calc(100vh-4rem)]">
      {/* Chat Section */}
      <div className="flex flex-col border-r border-gray-200 relative bg-white">
        {/* ✅ Background Layer - One Large Image, No Repeat */}
        <div 
          className="absolute inset-0 pointer-events-none z-0 chat-wallpaper" 
          aria-hidden="true" 
        />

        {/* Message List */}
        <div className="flex-1 p-4 overflow-y-auto space-y-3 relative z-10">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg text-sm ${
                  msg.role === 'user'
                    ? 'bg-primary text-white rounded-br-none'
                    : 'bg-white text-gray-800 border rounded-bl-none shadow'
                }`}
              >
                {msg.content}
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-white border border-gray-200 px-4 py-2 rounded-lg shadow max-w-xs">
                Japa Genie is typing...
              </div>
            </div>
          )}
        </div>

        {/* Input */}
        <form onSubmit={handleSubmit} className="p-4 bg-white border-t relative z-10 space-y-2">
            <div className="flex items-center justify-between px-1">
                <p className="text-xs text-muted-foreground">Your Personal AI Visa Guide</p>
                {wishesLeft > 0 ? (
                    <Badge variant="secondary">{wishesLeft} {wishesLeft === 1 ? 'wish' : 'wishes'} left</Badge>
                ) : (
                    <Badge variant="destructive">0 wishes left</Badge>
                )}
            </div>
          <div className="flex gap-2">
            <input
              ref={inputRef}
              type="text"
              value={currentInput}
              onChange={(e) => setCurrentInput(e.target.value)}
              placeholder={wishCount === 0 ? "Ask for your first wish..." : "Ask your next wish..."}
              className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              disabled={isTyping}
            />
            <button
              type="submit"
              disabled={isTyping || !currentInput.trim()}
              className="px-6 py-3 bg-primary hover:bg-primary/90 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-medium rounded-lg"
            >
              {isTyping ? '...' : 'Send'}
            </button>
          </div>
        </form>
      </div>

      {/* Insights Section */}
      <div className="p-6 overflow-y-auto bg-white">
        <h2 className="text-xl font-bold mb-4">Visa Insights</h2>
        
        {isInsightsLoading && <p className="text-gray-500">Generating insights...</p>}
        {!isInsightsLoading && !insights && <p className="text-gray-500">Ask a question to see insights...</p>}

        {insights && !isInsightsLoading && (
          <div className="space-y-6">
            {/* Key Insights */}
            {insights.insights && insights.insights.length > 0 && (
              <div>
                <h3 className="font-semibold text-lg mb-2">Key Insights</h3>
                <ul className="list-disc pl-5 space-y-2 text-sm">
                  {insights.insights.map((ins, idx) => (
                    <li key={idx}>
                      <strong>{ins.headline}:</strong> {ins.detail}
                      {ins.url && (
                        <a
                          href={ins.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary underline ml-2"
                        >
                          Learn more
                        </a>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Cost Estimates */}
            {insights.costEstimates && insights.costEstimates.length > 0 && (
              <div>
                <h3 className="font-semibold text-lg mb-2">Cost Estimates</h3>
                <ul className="list-disc pl-5 space-y-2 text-sm">
                  {insights.costEstimates.map((c, idx) => (
                    <li key={idx}>
                      {c.item}: {c.cost.toLocaleString()} {c.currency}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Visa Alternatives */}
            {insights.visaAlternatives && insights.visaAlternatives.length > 0 && (
              <div>
                <h3 className="font-semibold text-lg mb-2">Visa Alternatives</h3>
                <ul className="list-disc pl-5 space-y-2 text-sm">
                  {insights.visaAlternatives.map((v, idx) => (
                    <li key={idx}>
                      <strong>{v.visaName}:</strong> {v.description}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Chart Data */}
            {insights.chartData && insights.chartData.data.length > 0 && (
              <div>
                <h3 className="font-semibold text-lg mb-2">{insights.chartData.title}</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={insights.chartData.data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="value" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
