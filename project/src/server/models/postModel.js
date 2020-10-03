const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  // _id: { type: mongoose.Types.ObjectId },
  title: { type: String },
  content: { type: String },
});

module.exports = Post = mongoose.model("Post", postSchema);
