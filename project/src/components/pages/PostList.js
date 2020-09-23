import React, { useState, useEffect } from "react";
import axios from "axios";

import { baseUrl } from "../constants";
import Post from "./PostComponent";
import CreatePostModal from "./CreatePostModal";
import {
  getPostsApi,
  createPostApi,
  editPostApi,
  deletePostApi,
} from "../../api/posts";

export default function PostList() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getPostsApi().then((result) => {
      setPosts(result);
    });
  }, []);

  const createPost = (postData) => {
    createPostApi(postData)
      .then(() => {
        return getPostsApi();
      })
      .then((newPosts) => setPosts(newPosts));
  };

  const editPost = (postData) => {
    editPostApi(postData)
      .then(() => {
        return getPostsApi();
      })
      .then((newPosts) => setPosts(newPosts));
  };

  const deletePost = (postId) => {
    deletePostApi(postId)
      .then(() => {
        return getPostsApi();
      })
      .then((newPosts) => setPosts(newPosts));
  };

  return (
    <div>
      <CreatePostModal createPost={createPost} />
      {posts.map((post) => (
        <Post
          key={post._id}
          post={post}
          editPost={editPost}
          deletePost={deletePost}
        />
      ))}
    </div>
  );
}
