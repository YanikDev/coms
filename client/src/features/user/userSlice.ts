
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
  id: string;
  name: string;
  role: "admin" | "staff";
}

interface UserState {
  currentUser: User | null;
  users: User[];
}

interface User {
  id: string;
  name: string;
  role: "admin" | "staff";
  password: string;
}

const initialState: UserState = {
  currentUser: null,
  users: [
    { id: "1", name: "Admin", role: "admin", password: "admin123" },
    { id: "2", name: "Balu", role: "staff", password: "balu123" },
    { id: "3", name: "Prasad", role: "staff", password: "prasad123" },
  ],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<string>) => {
      const user = state.users.find((u) => u.name === action.payload);
      console.log(user)
      if (user) state.currentUser = user;
    },
    logout: (state) => {
      state.currentUser = null;
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
export type { User };
