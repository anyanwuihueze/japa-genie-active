import ChatClient from './client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Sparkles } from 'lucide-react';

export default function ChatPage() {
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
          <ChatClient />
        </div>
        <div className="hidden md:flex flex-col gap-8">
          <Card className="flex-1">
            <CardHeader className="flex flex-row items-center gap-2">
              <Sparkles className="w-5 h-5 text-primary" />
              <CardTitle className="text-xl">Insights</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                As you chat, relevant insights and information will appear here. For example, if you ask about student visas for Canada, we might show you the top 5 universities, average tuition costs, and a link to the official application portal.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
