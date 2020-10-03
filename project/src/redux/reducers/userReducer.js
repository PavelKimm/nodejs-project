import { USER_TYPES } from "../actions/userActions";

export default function (state = {}, action) {
  switch (action.type) {
    case USER_TYPES.SET_NAME:
      return { ...state, name: action.payload.name };
    case USER_TYPES.SET_EMAIL:
      return { ...state, email: action.payload.email };
    default:
      return state;
  }
}
