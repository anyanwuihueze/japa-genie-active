// /src/app/chat/ChatLayout.tsx  OR wherever your ChatLayout lives
import React from "react";

export default function ChatLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="chat-wallpaper min-h-screen w-full">
      {/* Chat container with soft rim shadow (elevated, framed look) */}
      <div className="max-w-4xl mx-auto p-4 bg-white/80 backdrop-blur-sm rounded-lg shadow-lg border border-white/20">
        {children}
      </div>
    </div>
  );
}