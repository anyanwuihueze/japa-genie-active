
'use client';

import { Button } from '@/components/ui/button';
import { JapaGenieLogo } from '@/components/icons';
import { Sheet, SheetTrigger, SheetContent } from '@/components/ui/sheet';
import { ChatPanel } from './chat-panel';

export function FloatingChatButton() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          size="lg"
          className="fixed bottom-6 right-6 z-50 h-12 rounded-full bg-primary text-primary-foreground shadow-lg animate-glow transition-transform hover:scale-105"
        >
          <JapaGenieLogo className="w-8 h-8 mr-2 text-black" />
          <span className="font-semibold whitespace-nowrap text-sm">Chat with Us</span>
        </Button>
      </SheetTrigger>
      <SheetContent className="p-0">
        <ChatPanel />
      </SheetContent>
    </Sheet>
  );
}
