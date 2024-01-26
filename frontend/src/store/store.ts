import { configureStore } from '@reduxjs/toolkit';
import authSlice from '@/features/auth/authSlice';
import userSlice from '@/features/user/userSlice';
import webAccessibilitySlice from '@/features/webAccessibility/webAccessibilitySlice';

// ...

export const store = configureStore({
  reducer: {
    webAccessibility: webAccessibilitySlice,
    user: userSlice,
    auth: authSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
