import { POSTS_TYPES } from "../actions/postsActions";

export default function (state = {}, action) {
  switch (action.type) {
    case POSTS_TYPES.SET_POSTS:
      return { ...state, posts: action.payload.posts };
    default:
      return state;
  }
}
