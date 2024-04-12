import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import profileReducer from '../features/profile/profileSlice';
import { setupListeners } from '@reduxjs/toolkit/query/react';
import { profileApi } from '../services/profile';

const store = configureStore({
  reducer: {
    auth: authReducer,
    profile: profileReducer,
    [profileApi.reducerPath]: profileApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(profileApi.middleware),
});

setupListeners(store.dispatch);

export default store;
