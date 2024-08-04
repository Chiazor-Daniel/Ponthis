import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../../../api';

export const transactionsApi = createApi({
  reducerPath: 'transactionsApi',
  baseQuery: fetchBaseQuery({ baseUrl:  BASE_URL }),
  endpoints: (builder) => ({
    deposit: builder.mutation({
      query: ({ amount, type, cardData, token }) => {
        const depositBody = generateDepositBody(amount, type, cardData);
        return {
          url: '/user/transaction/deposit-transaction/',
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            "x-token": token
          },
          body: depositBody,
        };
      },
    }),
    withdraw: builder.mutation({
      query: ({ amount, user_id, type, token, card_number, expiry_date, cvv, wallet_address, network_chain, preferred_token, bank_name, account_name, iban, bic, referrence }) => {
        const withdrawBody = generateWithdrawBody(type, user_id, amount, card_number, expiry_date, cvv, wallet_address, network_chain, preferred_token, bank_name, account_name, iban, bic, referrence);
        return {
          url: '/user/transactions/withdraw-transaction',
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            "x-token": token
          },
          body: withdrawBody,
        };
      },
    }),
    getTransactions: builder.query({
      query: (token) => ({
        url: '/user/withdraw/get-withdraw-transactions/',
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          "x-token": token
        },
      }),
    }),
    convertCrypto: builder.mutation({
      query: ({amount, token}) => ({
        url: `/user/withdraw/convert-crypto-to-fiat/?amount=${amount}`, 
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json',
          "x-token": token
        },
      })
    }),
    getRecoveryTransactions: builder.query({
      query: (token) => {
        return{
          url: '/user/transactions/get-recovery-transactions/',
          method: 'GET', 
          headers: {
            'Content-Type': 'application/json',
            "x-token": token
          },
        }
      }
    }), 
    getUserAssets: builder.query({
      query: (token)=> {
        return{
          url: '/user/account/get-user-balances/', 
          method: 'GET', 
          headers: {
            'Content-Type': 'application/json',
            "x-token": token
          }
        }
      }
    }), 
    getAllAssets: builder.query({
      query: (token) => {
        return{
          url: '/user/transactions/get-all-assets', 
          method: 'GET', 
          headers: {
            'Content-Type': 'application/json',
            "x-token": token
          }
        }

      }
    }), 
    getAllUserAssets: builder.query({
      query: (token) => {
        return{
          url: '/user/transactions/get-user-assets/', 
          method: 'GET', 
          headers: {
            'Content-Type': 'application/json',
            "x-token": token
          }
        }

      }
    }), 
    getUserCards : builder.query({
      query: (token) => {
        return{
          url: '/user/cards/get-cards/', 
          method: 'GET', 
          headers: {
            'Content-Type': 'application/json',
            "x-token": token
          }
        }
      }
    }), 
    getUserDeposits : builder.query({
      query: (token) => {
        return{
          url: '/user/transactions/get-user-deposits', 
          method: 'GET', 
          headers: {
            'Content-Type': 'application/json',
            "x-token": token
          }
        }
      }
    }), 
    getUserWithdrawals : builder.query({
      query: (token) => {
        return{
          url: '/user/transactions/get-withdraw-transactions/', 
          method: 'GET', 
          headers: {
            'Content-Type': 'application/json',
            "x-token": token
          }
        }
      }
    }), 
  }),
});

export const {useGetUserWithdrawalsQuery, useGetUserDepositsQuery, useGetAllUserAssetsQuery, useGetUserCardsQuery, useDepositMutation, useWithdrawMutation, useGetTransactionsQuery, useConvertCryptoMutation, useGetRecoveryTransactionsQuery, useGetUserAssetsQuery, useGetAllAssetsQuery } = transactionsApi;


const generateDepositBody = (amount, type, cardData) => {
  const depositBody = {
    "transaction_data": {
      "user_id": 0,
      "transaction_amount": amount,
      "created_at": "2024-04-18T11:49:27.671Z",
      "transaction_type": "deposit",
      "status": "pending",
      "transaction_method": "card-payment"
    },
    "card_data": {
      "firstname": "string",
      "lastname": "string",
      "card_number": 0,
      "expiry_date": "string",
      "cvv": 0
    }
  };

  switch (type) {
    case "bank-transfer":
      return {
        ...depositBody,
        "transaction_data": {
          ...depositBody.transaction_data,
          "transaction_method": "bank-transfer"
        }
      };
    case "crypto":
      return {
        ...depositBody,
        "transaction_data": {
          ...depositBody.transaction_data,
          "transaction_method": "cryptocurrency"
        }
      };
    case "card-payment":
    default:
      return {
        ...depositBody,
        "card_data": {
          "firstname": "John",
          "lastname": "Mike",
          "card_number": cardData.cardNumber,
          "expiry_date": cardData.expiryDate,
          "cvv": cardData.cvv
        }
      };
  }
};

const generateWithdrawBody = (type, user_id, amount, card_number, expiry_date, cvv, wallet_address, network_chain, preferred_token, bank_name, account_name, iban, bic, reference ) => {
  const commonData = {
    "transaction_data": {
      "user_id": user_id,
      "transaction_amount": amount,
      "created_at": "2024-04-16T23:37:21.884Z",
      "transaction_type": "withdraw",
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
        "transaction_data": {
          ...commonData.transaction_data,
          "bank_details_data": {
            "bank_name": bank_name,
            "account_name": account_name,
            "iban": iban,
            "bic": bic,
            "reference": reference
          },
          "transaction_method": "bank-transfer"
        }
      };
    case "card-payment":
      return {
        ...commonData,
        "transaction_data": {
          ...commonData.transaction_data,
          "card_details_data": {
            "firstname": "string", // Assuming these should be kept generic or updated accordingly
            "lastname": "string",  // Assuming these should be kept generic or updated accordingly
            "card_number": card_number,
            "expiry_date": expiry_date,
            "cvv": cvv
          },
          "transaction_method": "card-payment"
        }
      };
    case "crypto":
      return {
        ...commonData,
        "transaction_data": {
          ...commonData.transaction_data,
          "crypto_data": {
            "wallet_address": wallet_address,
            "network_chain": network_chain,
            "preferred_token": preferred_token
          },
          "transaction_method": "cryptocurrency"
        }
      };
    default:
      return commonData;
  }
};