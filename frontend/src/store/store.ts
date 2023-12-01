import userSlice from "@/features/user/userSlice";
import webAccessibilitySlice from "@/features/webAccessibility/webAccessibilitySlice";

import { configureStore } from "@reduxjs/toolkit";
// ...

export const store = configureStore({
  reducer: {
    webAccessibility: webAccessibilitySlice,
    user: userSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
