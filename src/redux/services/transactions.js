import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const transactionsApi = createApi({
  reducerPath: 'transactionsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://trader-app.onrender.com' }),
  endpoints: (builder) => ({
    deposit: builder.mutation({
      query: ({ amount, asset, walletAddress, token }) => ({
        url: '/transactions/deposit',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          "x-token": token
        },
        body: { amount, asset, walletAddress },
      }),
    }),
    withdraw: builder.mutation({
      query: ({ amount, asset, destination, token }) => ({
        url: '/transactions/withdraw',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: { amount, asset, destination },
      }),
    }),
  }),
});

export const { useDepositMutation, useWithdrawMutation } = transactionsApi;
