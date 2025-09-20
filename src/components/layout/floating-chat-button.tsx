// FILE: src/components/layout/floating-chat-button.tsx
'use client';

import Link from 'next/link';
import { MessageCircle } from 'lucide-react';

export function FloatingChatButton() {
  return (
    <Link
      href="/chat"
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 rounded-full bg-primary text-primary-foreground shadow-lg hover:bg-primary/90 transition-transform hover:scale-110"
      aria-label="Open Japa Genie Chat"
    >
      <MessageCircle size={28} />
    </Link>
  );
}
