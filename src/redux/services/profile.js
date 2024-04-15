import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const profileApi = createApi({
  reducerPath: 'profileApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://trader-app.onrender.com/user' }),
  endpoints: (builder) => ({
    getProfile: builder.query({
      query: () => '/profile', 
    }),
    updateProfile: builder.mutation({
      query: (userData) => ({
        url: '/profile/users', 
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          "x-token": userData.token
        },
        params: userData,
      }),
    }),
    changePassword: builder.mutation({
      query: ({ token, newPassword, oldPassword }) => ({
        url: '/profile/users/change-password', 
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          "x-token": token
        },
        params: { old_password: oldPassword ,new_password: newPassword },
      }),
    }),
  }),
});

export const { useGetProfileQuery, useUpdateProfileMutation, useChangePasswordMutation } = profileApi;
