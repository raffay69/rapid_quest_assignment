import mongoose, { Schema } from "mongoose";
import "dotenv/config";

const processed_messages_schema = new Schema({
  message_id: { type: String },
  conversation_id: { type: String, required: true },
  customer_name: { type: String, required: true },
  direction: { type: String, enum: ["inbound", "outbound"] },
  content: { type: String },
  status: {
    type: String,
    enum: ["sent", "delivered", "read"],
    default: "sent",
  },
  timestamp: { type: Date },
});

processed_messages_schema.index({ conversation_id: 1, timestamp: 1 });

export const messageModel = mongoose.model(
  "processed_messages",
  processed_messages_schema
);

async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      dbName: "Whatsapp",
    });
    console.log("DB connected");
  } catch (e) {
    console.log(e.message);
  }
}
connectDB();
