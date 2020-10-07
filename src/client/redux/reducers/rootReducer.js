import { combineReducers } from "redux";
import isAuthedReducer from "./isAuthed/isAuthedReducer";
import userDataReducer from "./userData/userDataReducer";
import snackbarReducer from "./snackbars/snackbarReducer";
import postsReducer from "./posts/postsReducer";

export default combineReducers({
  isAuthedReducer,
  userDataReducer,
  snackbarReducer,
  postsReducer,
});
