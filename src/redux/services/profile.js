import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../../api';
export const profileApi = createApi({
  reducerPath: 'profileApi',
  baseQuery: fetchBaseQuery({ baseUrl:  BASE_URL }),
  endpoints: (builder) => ({
    getProfile: builder.query({
      query: () => '/user/profile', 
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
        url: 'user/profile/users/change-password', 
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
