import connectDB from "@/lib/db";

import Conversation from "@/models/Conversation";

export async function GET(req: Request) {
  await connectDB();

  const convos = await Conversation.find();

  return Response.json(convos);
}
