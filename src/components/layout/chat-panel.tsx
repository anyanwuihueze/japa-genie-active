
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { JapaGenieLogo } from '@/components/icons';
import { Send, User, Bot, X } from 'lucide-react';
import { SheetHeader, SheetTitle, SheetDescription, SheetClose } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';

export function ChatPanel() {
  const [messages, setMessages] = useState([
    {
        role: 'assistant',
        content: "Hi there! I'm Japa Genie, your AI assistant. How can I help you today?"
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    // TODO: Connect to Genkit flow
    console.log('User message:', input);
    setInput('');
  };

  return (
    <div className="flex flex-col h-full bg-card">
      <SheetHeader className="p-4 border-b">
        <SheetTitle className="flex items-center gap-2">
            <Bot className="w-6 h-6 text-primary"/>
            AI Chat Assistant
        </SheetTitle>
        <SheetDescription>
          Ask questions about our services, pricing, or features.
        </SheetDescription>
      </SheetHeader>
      <ScrollArea className="flex-1">
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
        </div>
      </ScrollArea>
      <div className="p-4 border-t mt-auto bg-card">
        <form onSubmit={handleSubmit} className="flex gap-4">
          <Input
            value={input}
            onChange={handleInputChange}
            placeholder="Ask a question..."
            disabled={isLoading}
            className="flex-1"
          />
          <Button type="submit" disabled={isLoading || !input.trim()}>
            <Send className="w-4 h-4" />
          </Button>
        </form>
      </div>
    </div>
  );
}
