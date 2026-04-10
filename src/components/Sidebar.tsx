"use client";
import { useEffect, useState } from "react";

export default function Sidebar({ setConversationId }) {
  const [convos, setConvos] = useState([]);

  useEffect(() => {
    fetch("/api/conversations", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then(res => res.json())
      .then(setConvos);
  }, []);

  return (
    <div className="w-64 bg-gray-800 p-4">
      <button
        className="mb-4 bg-blue-500 px-3 py-2 rounded"
        onClick={() => setConversationId(null)}
      >
        + New Chat
      </button>

      {convos.map(c => (
        <div
          key={c._id}
          onClick={() => setConversationId(c._id)}
          className="p-2 hover:bg-gray-700 cursor-pointer"
        >
          {c.title}
        </div>
      ))}
    </div>
  );
}