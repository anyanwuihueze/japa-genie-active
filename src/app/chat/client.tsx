'use client';

import { useState, useRef, useEffect } from 'react';
import { visaChatAssistant } from '@/ai/flows/visa-chat-assistant';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { JapaGenieLogo } from '@/components/icons';
import { Loader2, Send, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { readStreamableValue } from 'ai/rsc';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function ChatClient() {
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
    setInput('');
    setIsLoading(true);
  
    // Add an empty assistant message to update
    setMessages((prev) => [...prev, { role: 'assistant', content: '' }]);
  
    try {
      const stream = await visaChatAssistant({ question: input });
  
      let text = '';
      for await (const delta of readStreamableValue(stream)) {
        if (typeof delta === 'string') {
          text += delta;
          setMessages((prevMessages) => {
            const newMessages = [...prevMessages];
            newMessages[newMessages.length - 1].content = text;
            return newMessages;
          });
        }
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An error occurred.';
      toast({
        variant: 'destructive',
        title: 'Chat Error',
        description: errorMessage,
      });
      setMessages((prevMessages) => {
        const newMessages = [...prevMessages];
        const content = `Sorry, I encountered an error: ${errorMessage}`;
        newMessages[newMessages.length - 1].content = content;
        return newMessages;
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  useEffect(() => {
    if (scrollAreaRef.current) {
        scrollAreaRef.current.scrollTo({
            top: scrollAreaRef.current.scrollHeight,
            behavior: 'smooth'
        });
    }
  }, [messages]);


  return (
    <div className="flex flex-col flex-1 bg-card rounded-lg border h-full">
      <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
        <div className="space-y-6">
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
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    <JapaGenieLogo className="w-5 h-5" />
                  </AvatarFallback>
                </Avatar>
              )}
              <div
                className={cn(
                  'max-w-md p-3 rounded-xl',
                   message.role === 'user'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted',
                   isLoading && index === messages.length -1 && 'flex items-center gap-2'
                )}
              >
                 {isLoading && index === messages.length - 1 && !message.content && (
                    <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        <span className="text-sm text-muted-foreground">Thinking...</span>
                    </>
                 )}
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
        </div>
      </ScrollArea>
      <div className="p-4 border-t">
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
