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
  }),
});

export const { useGetAllTradesQuery } = tradeDetailsApi;
