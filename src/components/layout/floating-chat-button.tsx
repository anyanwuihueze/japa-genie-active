'use client';

import { JapaGenieLogo } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { MessageSquare } from 'lucide-react';

export function FloatingChatButton() {
  return (
    <div className="fixed bottom-8 right-8 z-50">
      <Button
        className="group relative flex items-center justify-center w-16 h-16 rounded-full bg-primary text-accent shadow-lg transition-all duration-300 ease-in-out hover:w-48 animate-glow"
      >
        <JapaGenieLogo className="w-8 h-8 absolute transition-opacity duration-200 group-hover:opacity-0 text-black" />
        <div className="flex items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
           <MessageSquare className="w-6 h-6 mr-2 text-primary-foreground" />
           <span className="font-semibold whitespace-nowrap text-primary-foreground">Chat with Us</span>
        </div>
      </Button>
    </div>
  );
}
