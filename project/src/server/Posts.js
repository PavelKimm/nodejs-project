const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  _id: mongoose.Types.ObjectId,
  title: String,
  content: String,
});

exports.get = async function (req, res, next) {
  const Post = mongoose.model("Post", postSchema);
  const posts = await Post.find({}).sort("-_id");
  res.json(posts);
};

exports.getOne = async function (req, res, next) {
  const Post = mongoose.model("Post", postSchema);
  var objectId = mongoose.Types.ObjectId(req.params.postId);
  await Post.findOne({ _id: objectId }, function (err, post) {
    if (err) throw err;
    res.json(post);
  });
};

exports.createOne = async function (req, res, next) {
  const Post = mongoose.model("Post", postSchema);
  const post = new Post({
    _id: null,
    title: req.body.title,
    content: req.body.content,
  });
  await Post.create(post, function (err, post) {
    if (err) throw err;
    res.json(post);
  });
};

exports.updateOne = async function (req, res, next) {
  const Post = mongoose.model("Post", postSchema);
  var objectId = mongoose.Types.ObjectId(req.params.postId);
  await Post.updateOne(
    { _id: objectId },
    { $set: { title: req.body.title, content: req.body.content } },
    { new: true },
    (err, post) => {
      if (err) {
        res.json("An error occurred while updating data!");
      }
      res.json(post);
    }
  );
};

exports.deleteOne = async function (req, res, next) {
  const Post = mongoose.model("Post", postSchema);
  var objectId = mongoose.Types.ObjectId(req.params.postId);
  await Post.deleteOne({ _id: objectId });
  res.json("no content");
};
