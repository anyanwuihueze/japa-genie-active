
'use client';

import Link from 'next/link';
import { MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function FloatingChatButton() {
  // This is now a simple link to the new visitor chat page.
  // This removes the complex Sheet and ChatPanel, fixing the site-wide crash.
  // We can add authentication logic here later, once an auth system is built.
  const chatUrl = '/visitor-chat';
  const ariaLabel = 'Chat with our AI Assistant';

  return (
    <Link
      href={chatUrl}
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 rounded-full bg-primary text-primary-foreground shadow-lg hover:bg-primary/90 transition-transform hover:scale-110"
      aria-label={ariaLabel}
    >
      <MessageCircle size={28} />
    </Link>
  );
}
