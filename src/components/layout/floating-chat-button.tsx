'use client';

import { Button } from '@/components/ui/button';
import { JapaGenieLogo } from '@/components/icons';

export function FloatingChatButton() {
  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Button
        size="lg"
        className="h-12 rounded-full bg-primary text-primary-foreground shadow-lg animate-glow transition-transform hover:scale-105"
      >
        <JapaGenieLogo className="w-8 h-8 mr-2 text-black" />
        <span className="font-semibold whitespace-nowrap text-sm">Chat with Us</span>
      </Button>
    </div>
  );
}
