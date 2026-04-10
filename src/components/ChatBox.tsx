"use client";
import { useState } from "react";

export default function ChatBox({ conversationId, setConversationId }) {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);

  const send = async () => {
    const res = await fetch("/api/chat", {
      method: "POST",
      body: JSON.stringify({ message, conversationId }),
    });

    if (!res.ok) {
      const text = await res.text();
      console.error("API Error:", text);
      return;
    }

    const data = await res.json();

    setConversationId(data.conversationId);

    setChat([
      ...chat,
      { role: "user", content: message },
      { role: "assistant", content: data.reply },
    ]);

    setMessage("");
  };

  return (
    <div className="flex-1 p-6">
      <div className="space-y-4">
        {chat.map((m, i) => (
          <div key={i}>
            <b>{m.role}:</b> {m.content}
          </div>
        ))}
      </div>

      <div className="mt-6 flex">
        <input
          className="flex-1 p-2 bg-gray-800 rounded"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button onClick={send} className="ml-2 bg-blue-500 px-4 rounded">
          Send
        </button>
      </div>
    </div>
  );
}
