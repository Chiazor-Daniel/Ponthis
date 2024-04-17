import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const transactionsApi = createApi({
  reducerPath: 'transactionsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://trader-app.onrender.com/user' }),
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
      query: ({ amount, type, token, card_number, expiry_date, cvv, wallet_address, network_chain, preferred_token }) => {
        // Log the arguments before posting the request
        console.log("Withdraw Arguments:", { amount, type, token, card_number, expiry_date, cvv, wallet_address, network_chain, preferred_token });
        return {
          url: '/transaction/withdraw-transaction',
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            "x-token": token
          },
          body: generateWithdrawBody(type, amount, card_number, expiry_date, cvv, wallet_address, network_chain, preferred_token),
        };
      },
    }),
    
    getTransactions: builder.query({
      query: (token) => ({
        url: '/transaction/get-transactions/',
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          "x-token": token
        },
      }),
    }),
  }),
});

export const { useDepositMutation, useWithdrawMutation, useGetTransactionsQuery } = transactionsApi;

const generateWithdrawBody = (type, amount, card_number, expiry_date, cvv, wallet_address, network_chain, preferred_token) => {
  const commonData = {
    "transaction_data": {
      "user_id": 0,
      "transaction_amount": 0,
      "created_at": "2024-04-16T23:37:21.884Z",
      "transaction_type": "deposit",
      "status": "pending",
      "transaction_method": "card-payment"
    },
    "crypto_data": {
      "wallet_address": "string",
      "network_chain": "string",
      "preferred_token": "string"
    },
    "card_details_data": {
      "firstname": "string",
      "lastname": "string",
      "card_number": 0,
      "expiry_date": "string",
      "cvv": 0
    },
    "bank_details_data": {
      "bank_name": "string",
      "account_name": "string",
      "iban": "string",
      "bic": "string",
      "reference": "string"
    }
  };

  switch (type) {
    case "bank-transfer":
      return {
        ...commonData,
        "transaction_method": "card-payment"
      };
    case "card-payment":
      return {
        ...commonData,
        "transaction_amount": amount,
        "card_number": card_number,
        "expiry_date": expiry_date,
        "cvv": cvv
      };
    case "crypto":
      return {
        ...commonData,
        "wallet_address": wallet_address,
        "network_chain": network_chain,
        "preferred_token": preferred_token,
        "transaction_method": "cryptocurrency"
      };
    default:
      return commonData;
  }
};
