import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./slice/counterSlice";
import activityReducer from './slice/activitySlice'


const store = configureStore({
  reducer: activityReducer
});

export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
