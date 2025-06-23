import mongoose from "mongoose";
const { Schema } = mongoose;

const EmailSchema = new Schema({
  sendTo: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  sentAt: {
    type: Date,
    default: Date.now
  }
});

const Email = mongoose.model("Email", EmailSchema);

export default Email;
