import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  sender: { type: String },
  message: { type: String },
  timestamp: { type: Date },
});

const Message = mongoose.model("Message", messageSchema);
export default Message;
