import axios from "axios";

import { baseUrl } from "../constants";

export function getPostsApi() {
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

export function createPostApi(postData) {
  return axios
    .post(baseUrl + `/api/posts`, {
      title: postData.title,
      content: postData.content,
    })
    .catch((err) => {
      alert(err);
    });
}

export function editPostApi(postData) {
  return axios
    .patch(baseUrl + `/api/posts/` + postData._id, {
      title: postData.title,
      content: postData.content,
    })
    .catch((err) => {
      alert(err);
    });
}

export function deletePostApi(_id) {
  if (window.confirm("Are you sure?")) {
    return axios
      .delete(baseUrl + `/api/posts/` + _id)
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        alert(error);
      });
  }
}
