import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const paymentDetailsApi = createApi({
  reducerPath: 'paymentDetailsApi',
  baseQuery: fetchBaseQuery({ 
    baseUrl: 'https://trader-app.onrender.com',
  }),
  endpoints: (builder) => ({
    getPaymentDetails: builder.query({
      query: (token) => ({
        url: '/user/transaction/get-payment-details',
        headers: {
          'Content-Type': 'application/json',
          "x-token": token
        },
        params: {
          key: "Less Loved"
        }
      }),
    }),
  }),
});

export const { useGetPaymentDetailsQuery } = paymentDetailsApi;
