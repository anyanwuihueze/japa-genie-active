// FILE: src/components/layout/floating-chat-button.tsx
'use client';

import { useState } from 'react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { MessageCircle } from 'lucide-react';
import { ChatPanel } from './chat-panel';

export function FloatingChatButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button
          size="icon"
          className="fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full shadow-lg bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
          aria-label="Open chat"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-lg p-0">
        <SheetHeader className="sr-only">
          <SheetTitle>Chat</SheetTitle>
          <SheetDescription>
            Chat with the Japa Genie assistant to get answers to your questions.
          </SheetDescription>
        </SheetHeader>
        <ChatPanel />
      </SheetContent>
    </Sheet>
  );
}
