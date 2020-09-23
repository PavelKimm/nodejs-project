import React, { useState, useEffect } from "react";
import axios from "axios";

import { baseUrl } from "../constants";
import Post from "./PostComponent";

function getPosts() {
  return axios
    .get(baseUrl + `/api/posts`)
    .then((res) => {
      const posts = res.data;
      return posts;
    })
    .catch((error) => {
      console.error(error);
      return [];
    });
}

export default function PostList() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getPosts().then((result) => {
      setPosts(result);
    });
  }, []);

  // useEffect(() => {
  //   getPosts().then((result) => {
  //     setPosts(result);
  //   });
  // });

  return (
    <div>
      {posts.map((post) => (
        <Post key={post._id} post={post} />
      ))}
    </div>
  );
}
