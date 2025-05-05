import { configureStore } from "@reduxjs/toolkit";
import todoPaginationReducer from "./components/todo/todoSlice";
import postPaginationReducer from "./components/posts/postSlice";
import userPaginationReducer from "./components/users/userSlice";

export const store = configureStore({
  reducer: {
    todoPage: todoPaginationReducer,
    postPage: postPaginationReducer,
    userPage: userPaginationReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
