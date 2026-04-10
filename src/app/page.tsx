"use client";
import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import ChatBox from "@/components/ChatBox";

export default function Home() {
  const [conversationId, setConversationId] = useState(null);

  return (
    <div className="flex h-screen text-white bg-gray-900">
      <Sidebar setConversationId={setConversationId} />
      <ChatBox
        conversationId={conversationId}
        setConversationId={setConversationId}
      />
    </div>
  );
}
