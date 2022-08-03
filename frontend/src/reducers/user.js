import { createSlice } from "@reduxjs/toolkit";
import Cookie from "universal-cookie";

var cookie = new Cookie();
console.log(cookie.get("user"));
const initialStateValue = cookie.get("user") || {
  logged: false,
  email: "",
  id: 0,
  language: 0,
  password: "",
  type: 0,
  username: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState: { value: initialStateValue },
  reducers: {
    //pass NULL for set initial value
    updateUser: (state, action) => {
      state.value = action.payload;
      cookie.set("user", action.payload);
    },
  },
});

export const { login, logout, updateUser } = userSlice.actions;

export default userSlice.reducer;
