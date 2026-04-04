import mongoose from "mongoose";
import { v4 as uuidv4 } from 'uuid';

const PostSchema = new mongoose.Schema({
  postId: {
    type: String,
    default: () => uuidv4(),
    unique: true,
  },
  title: {
    type: String,
    required: true,
    trim: true, // Extra spaces remove karne ke liye
  },
  description: {
    type: String, // Agar text hai toh String rakhein, agar Rich Text (HTML) hai toh String hi best hai
    required: true,
  },
  requirements: {
    type: [String], // Array of strings
    required: true,
  },
  benefits: {
    type: [String], // Array of strings
    required: true,
  },
}, {
  timestamps: true,
});

const Post = mongoose.model("Post", PostSchema);

export default Post;