import { combineReducers } from "redux";
import postsReducer from "./postsReducer";
import userReducer from "./userReducer";
import userDataReducer from "./userData/userDataReducer";

export default combineReducers({
  postsReducer,
  userReducer,
  userDataReducer,
});
