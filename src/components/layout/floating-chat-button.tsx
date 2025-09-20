// FILE: src/components/layout/floating-chat-button.tsx
'use client';

import Link from 'next/link';
import { MessageCircle } from 'lucide-react';

export function FloatingChatButton() {
  return (
    <Link
      href="/chat"
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 rounded-full bg-blue-600 text-white shadow-lg hover:bg-blue-700 transition"
      aria-label="Open Japa Genie Chat"
    >
      <MessageCircle size={28} />
    </Link>
  );
}
