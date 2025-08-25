
'use client';

import { useState } from 'react';
import { JapaGenieLogo } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { MessageSquare } from 'lucide-react';

export function FloatingChatButton() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleChat = () => {
    setIsOpen(!isOpen);
    // Later, this will open a chat widget
  };

  return (
    <div className="fixed bottom-8 right-8 z-50">
      <Button
        onClick={toggleChat}
        className="group relative flex items-center justify-center w-16 h-16 rounded-full bg-accent text-accent-foreground shadow-lg transition-all duration-300 ease-in-out hover:w-48 hover:bg-primary hover:text-primary-foreground animate-glow"
      >
        <JapaGenieLogo className="w-8 h-8 absolute transition-opacity duration-200 group-hover:opacity-0" />
        <div className="flex items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
           <MessageSquare className="w-6 h-6 mr-2" />
           <span className="font-semibold whitespace-nowrap">Chat with Us</span>
        </div>
      </Button>
    </div>
  );
}
