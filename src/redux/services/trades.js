import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const tradeDetailsApi = createApi({
  reducerPath: 'tradeDetailsApi',
  baseQuery: fetchBaseQuery({ 
    baseUrl: 'https://trader-app.onrender.com',
  }),
  endpoints: (builder) => ({
    getAllTrades: builder.query({
      query: (token) => ({
        url: '/user/trader/get-all-trade',
        headers: {
          'Content-Type': 'application/json',
          "x-token": token
        }
      }),
    }),
    getAllAssets: builder.query({
      query: (token) => ({
        url: '/user/trader/get-assets',
        headers: {
          'Content-Type': 'application/json',
          "x-token": token
        }
      }),
    }),
    openTrade: builder.mutation({
      query: ({ token, data }) => ({
        url: '/user/trader/open-trade/',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          "x-token": token
        },
        body: data,
      }),
    }),
  }),
});

export const { useGetAllTradesQuery, useGetAllAssetsQuery, useOpenTradeMutation } = tradeDetailsApi;
