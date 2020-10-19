import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  title: { type: String },
  content: { type: String },
  image: { type: String, required: true },
});

const Post = mongoose.model("Post", postSchema);
export default Post;
