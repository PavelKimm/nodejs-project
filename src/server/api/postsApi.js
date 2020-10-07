import mongoose from "mongoose";
import Post from "../models/postModel";

export const get = async function (req, res, next) {
  const posts = await Post.find({}).sort("-_id");
  res.json(posts);
};

export const getOne = async function (req, res, next) {
  await Post.findOne({ _id: req.params.postId }, function (err, post) {
    if (err) throw err;
    res.json(post);
  });
};

export const createOne = async function (req, res, next) {
  const post = new Post({
    _id: mongoose.Types.ObjectId(),
    title: req.body.title,
    content: req.body.content,
  });
  await Post.create(post, function (err, post) {
    if (err) throw err;
    res.json(post);
  });
};

export const updateOne = async function (req, res, next) {
  await Post.updateOne(
    { _id: req.params.postId },
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

export const deleteOne = async function (req, res, next) {
  await Post.deleteOne({ _id: req.params.postId });
  res.json("no content");
};
