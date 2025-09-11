// FILE: src/app/chat/client.tsx
'use client';

import { useState, useRef, useEffect } from 'react';
import { visaChatAssistant } from '@/ai/flows/visa-chat-assistant';
import { useRouter } from 'next/navigation';
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import type { InsightOutput } from '@/ai/schemas/insight-schemas';
import VisitorChatGate from '@/components/chat/visitor-chat-gate';
import { generateInsights } from '@/ai/flows/insights-generator';

export function ChatPanel({
  insights,
  onNewInsights,
  onInsightsLoading,
}: {
  insights: InsightOutput | null;
  onNewInsights: (insights: InsightOutput | null) => void;
  onInsightsLoading: (loading: boolean) => void;
}) {
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant'; content: string }[]>([
    {
      role: 'assistant',
      content:
        'Welcome, Pathfinder! I’m Japa Genie, your magical guide for international relocation. I can grant you 3 powerful wishes (answers) to map out your visa journey. What is your first wish?',
    },
  ]);
  const [currentInput, setCurrentInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [questionCount, setQuestionCount] = useState(0);
  const [isUpgraded, setIsUpgraded] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const MAX_FREE_QUESTIONS = 3;

  useEffect(() => {
    inputRef.current?.focus();
    if (localStorage.getItem('userEmail')) {
      setIsUpgraded(true);
    }
  }, []);

  const handleUpgrade = () => {
    setIsUpgraded(true);
  };

  const handleEmailSubmit = async (email: string) => {
    localStorage.setItem('userEmail', email);
    // You could also save the email to a database here
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = currentInput.trim();
    if (!trimmed || isTyping) return;

    if (!isUpgraded && questionCount >= MAX_FREE_QUESTIONS) {
        // The VisitorChatGate will be shown, so don't process the message
        return;
    }

    const userMessage = { role: 'user' as const, content: trimmed };
    setMessages((prev) => [...prev, userMessage]);
    setCurrentInput('');
    setIsTyping(true);
    onInsightsLoading(true);

    try {
      // Fetch both chat response and insights in parallel
      const [chatResult, insightResult] = await Promise.all([
        visaChatAssistant({ question: trimmed }),
        generateInsights({ question: trimmed })
      ]);

      const aiResponse = chatResult.answer;

      setMessages((prev) => [...prev, { role: 'assistant', content: aiResponse }]);
      onNewInsights(insightResult);

      if (!isUpgraded) {
        setQuestionCount((prev) => prev + 1);
      }
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: 'Oops! I had a problem granting that wish. Please check your connection and try again.',
        },
      ]);
      onNewInsights(null);
    } finally {
      setIsTyping(false);
      onInsightsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full max-w-2xl mx-auto overflow-hidden">
      {/* Messages */}
      <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-transparent">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex ${
              msg.role === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            <div
              className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg text-sm shadow-md ${
                msg.role === 'user'
                  ? 'bg-primary text-primary-foreground rounded-br-none'
                  : 'bg-card text-card-foreground border rounded-bl-none'
              }`}
            >
              {msg.content}
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-card border text-card-foreground px-4 py-2 rounded-lg rounded-bl-none shadow-md max-w-xs">
              Japa Genie is thinking...
            </div>
          </div>
        )}
      </div>
      
      {/* Gating Logic */}
      <div className="p-4 bg-transparent">
        {!isUpgraded && (
            <VisitorChatGate 
                questionsUsed={questionCount}
                maxQuestions={MAX_FREE_QUESTIONS}
                onEmailSubmit={handleEmailSubmit}
                onUpgrade={handleUpgrade}
            />
        )}
      </div>

      {/* Input Form */}
      <form onSubmit={handleSubmit} className="p-4 bg-transparent border-t-0">
        <div className="flex gap-2">
          <input
            ref={inputRef}
            type="text"
            value={currentInput}
            onChange={(e) => setCurrentInput(e.target.value)}
            placeholder={
                !isUpgraded && questionCount >= MAX_FREE_QUESTIONS 
                ? "Please enter your email above to continue" 
                : "Ask your visa question..."
            }
            className="flex-1 p-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition bg-card"
            disabled={isTyping || (!isUpgraded && questionCount >= MAX_FREE_QUESTIONS)}
          />
          <button
            type="submit"
            disabled={isTyping || !currentInput.trim() || (!isUpgraded && questionCount >= MAX_FREE_QUESTIONS)}
            className="px-6 py-3 bg-primary hover:bg-primary/90 disabled:bg-muted disabled:cursor-not-allowed text-white font-medium rounded-lg transition flex items-center justify-center min-w-[80px]"
          >
            {isTyping ? '...' : 'Send'}
          </button>
        </div>
        {isUpgraded && (
            <p className="text-xs text-muted-foreground mt-2 text-center">
                You have unlimited wishes!
            </p>
        )}
      </form>
    </div>
  );
}
