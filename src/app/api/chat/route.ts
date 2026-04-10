import  connectDB  from "@/lib/db";
import { model } from "@/lib/langchain";

import Conversation from "@/models/Conversation";

export async function POST(req: Request) {
  await connectDB();

  const { message, conversationId } = await req.json();

  let convo = await Conversation.findById(conversationId);

  if (!convo) {
    convo = new Conversation({
      title: message.slice(0, 20),
      messages: [],
    });
  }

  // previous messages
  const history = convo.messages
    .map((m) => `${m.role}: ${m.content}`)
    .join("\n");

  const prompt = `Previous conversation:${history} User: ${message}`;

  const res = await model.invoke(prompt);

  convo.messages.push(
    { role: "user", content: message },
    { role: "assistant", content: res.content },
  );

  await convo.save();

  return Response.json({
    reply: res.content,
    conversationId: convo._id,
  });
}
