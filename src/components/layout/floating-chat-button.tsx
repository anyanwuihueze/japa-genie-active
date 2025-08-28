'use client';

import { Button } from '@/components/ui/button';
import { JapaGenieLogo } from '@/components/icons';

export function FloatingChatButton() {
  return (
    <div className="fixed bottom-8 right-8 z-50">
      <Button
        size="lg"
        className="h-14 rounded-full bg-primary text-primary-foreground shadow-lg animate-glow transition-transform hover:scale-105"
      >
        <JapaGenieLogo className="w-6 h-6 mr-2 text-black" />
        <span className="font-semibold whitespace-nowrap">Chat with Us</span>
      </Button>
    </div>
  );
}
