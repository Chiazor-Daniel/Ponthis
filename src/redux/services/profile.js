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
  }),
});

export const { useGetProfileQuery, useUpdateProfileMutation } = profileApi;
