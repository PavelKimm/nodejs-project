export const USER_TYPES = { SET_NAME: "SET_NAME", SET_EMAIL: "SET_EMAIL" };

export const setNameAC = (name) => ({
  type: USER_TYPES.SET_NAME,
  payload: { name },
});

export const setEmailAC = (email) => ({
  type: USER_TYPES.SET_EMAIL,
  payload: { email },
});
