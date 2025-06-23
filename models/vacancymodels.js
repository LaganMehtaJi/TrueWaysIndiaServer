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
  },
  description: {
    type: Object,
    required: true,
  },
  requirements: {
    type: Object,
    required: true,
  },
  benefits: {
    type: Object,
    required: true,
  },
}, {
  timestamps: true,
});

const Post = mongoose.model("Post", PostSchema);
export default Post;
