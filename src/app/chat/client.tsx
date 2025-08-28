'use client';

import { useState, useRef, useEffect } from 'react';
import { visaChatAssistant } from '@/ai/flows/visa-chat-assistant';
import { generateInsights } from '@/ai/flows/insights-generator';
import type { InsightOutput } from '@/ai/schemas/insight-schemas';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { JapaGenieLogo } from '@/components/icons';
import { Loader2, Send, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface ChatClientProps {
    insights: InsightOutput | null;
    onNewInsights: (insights: InsightOutput) => void;
    onInsightsLoading: (loading: boolean) => void;
}

export default function ChatClient({ onNewInsights, onInsightsLoading }: ChatClientProps) {
  const { toast } = useToast();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages((prev) => [...prev, userMessage]);
    const currentInput = input;
    setInput('');
    setIsLoading(true);
    onInsightsLoading(true);

    try {
      const [chatResult, insightResult] = await Promise.all([
        visaChatAssistant({ question: currentInput }),
        generateInsights({ question: currentInput }),
      ]);
      
      onNewInsights(insightResult);

      if (chatResult.answer) {
        setMessages((prev) => [...prev, { role: 'assistant', content: chatResult.answer }]);
      } else {
         throw new Error("The AI assistant did not provide an answer.");
      }

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred.';
      setMessages((prev) => [...prev, { role: 'assistant', content: `Sorry, I ran into a problem: ${errorMessage}` }]);
      toast({
        variant: 'destructive',
        title: 'Chat Error',
        description: errorMessage,
      });
    } finally {
      setIsLoading(false);
      onInsightsLoading(false);
    }
  };

  useEffect(() => {
    if (scrollAreaRef.current) {
        const viewport = scrollAreaRef.current.querySelector('div[data-radix-scroll-area-viewport]');
        if (viewport) {
            viewport.scrollTo({
                top: viewport.scrollHeight,
                behavior: 'smooth'
            });
        }
    }
  }, [messages]);


  return (
    <div className="flex flex-col flex-1 bg-card h-full bg-world-map">
      <ScrollArea className="flex-1 h-full" ref={scrollAreaRef}>
        <div className="space-y-6 p-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={cn(
                'flex items-start gap-4',
                message.role === 'user' ? 'justify-end' : 'justify-start'
              )}
            >
              {message.role === 'assistant' && (
                <Avatar className="w-8 h-8">
                  <AvatarFallback className="bg-muted">
                    <JapaGenieLogo className="w-5 h-5 text-accent" />
                  </AvatarFallback>
                </Avatar>
              )}
              <div
                className={cn(
                  'max-w-md p-3 rounded-xl',
                   message.role === 'user'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted'
                )}
              >
                <p className="text-sm whitespace-pre-wrap">{message.content}</p>
              </div>
              {message.role === 'user' && (
                <Avatar className="w-8 h-8">
                  <AvatarFallback>
                    <User size={20} />
                  </AvatarFallback>
                </Avatar>
              )}
            </div>
          ))}
           {isLoading && (
             <div className="flex items-start gap-4 justify-start">
                <Avatar className="w-8 h-8">
                  <AvatarFallback className="bg-muted">
                    <JapaGenieLogo className="w-5 h-5 text-accent" />
                  </AvatarFallback>
                </Avatar>
                <div className="bg-muted p-3 rounded-xl flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span className="text-sm text-muted-foreground">Thinking...</span>
                </div>
            </div>
           )}
        </div>
      </ScrollArea>
      <div className="p-4 border-t mt-auto">
        <form onSubmit={handleSubmit} className="flex gap-4">
          <Input
            value={input}
            onChange={handleInputChange}
            placeholder="Ask about visa types, requirements, or processes..."
            disabled={isLoading}
            className="flex-1"
          />
          <Button type="submit" disabled={isLoading || !input.trim()}>
            <Send className="w-4 h-4 mr-2" />
            Send
          </Button>
        </form>
      </div>
    </div>
  );
}
