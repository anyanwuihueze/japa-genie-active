// FILE: src/components/layout/floating-chat-button.tsx
'use client';

import { useState } from 'react';
import { MessageCircle } from 'lucide-react';
import { Sheet, SheetContent, SheetTitle, SheetDescription } from '@/components/ui/sheet';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import { ChatPanel } from './chat-panel';

export function FloatingChatButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 rounded-full bg-blue-600 text-white shadow-lg hover:bg-blue-700 transition"
        aria-label="Open Japa Genie Chat"
      >
        <MessageCircle size={28} />
      </button>

      {/* Chat Sheet */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="right" className="sm:max-w-lg w-full">
          {/* ✅ Accessibility fix */}
          <VisuallyHidden asChild>
            <SheetTitle>Japa Genie Chat</SheetTitle>
          </VisuallyHidden>
          <VisuallyHidden asChild>
            <SheetDescription>
              Open the Japa Genie assistant to ask about relocation and visas
            </SheetDescription>
          </VisuallyHidden>

          {/* Chat Panel */}
          <ChatPanel />
        </SheetContent>
      </Sheet>
    </>
  );
}
