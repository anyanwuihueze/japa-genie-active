import ChatClient from './client';

export default function ChatPage() {
  return (
    <div className="flex flex-col h-[calc(100vh-4rem)]">
      <header className="p-4 border-b">
        <h1 className="text-2xl font-bold tracking-tight">AI Chat Assistant</h1>
        <p className="text-sm text-muted-foreground">
          Ask me anything about the visa application process.
        </p>
      </header>
      <ChatClient />
    </div>
  );
}
