import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const userAccountApi = createApi({
  reducerPath: 'userAccountApi',
  baseQuery: fetchBaseQuery({ 
    baseUrl: 'https://trader-app.onrender.com',
  }),
  endpoints: (builder) => ({
    getUserAccount: builder.query({
      query: (token) => ({
        url: '/user/account/get-account/',
        headers: {
            'Content-Type': 'application/json',
            "x-token": token
        },
      }),
    }),
  }),
});

export const { useGetUserAccountQuery } = userAccountApi;
