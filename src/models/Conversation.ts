import mongoose from "mongoose";

const conversationSchema = new mongoose.Schema({
  title: String,
  messages: [
    {
      role: String,
      content: String,
    },
  ],
});

export default mongoose.models.Conversation ||
  mongoose.model("Conversation", conversationSchema);
