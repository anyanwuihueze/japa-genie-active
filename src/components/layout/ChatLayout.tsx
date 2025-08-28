import React from "react";

export default function ChatLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="chat-wallpaper min-h-screen w-full">
      {/* Chat container */}
      <div className="max-w-4xl mx-auto p-4">
        {children}
      </div>
    </div>
  );
}
