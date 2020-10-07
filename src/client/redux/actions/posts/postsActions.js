export const POSTS_TYPES = {
  SET_POSTS: "SET_POSTS",
};

export const setPostsAC = (posts) => ({
  type: POSTS_TYPES.SET_POSTS,
  payload: { posts },
});
