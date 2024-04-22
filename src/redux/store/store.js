import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import profileReducer from '../features/profile/profileSlice';
import userAccountReducer from '../features/account/accountSlice';
import paymentDetailsReducer from '../features/payment-details/paymentSlice';
import { paymentDetailsApi } from '../services/paymentDetails';
import { profileApi } from '../services/profile';
import { userAccountApi } from '../services/account';
import { transactionsApi } from '../services/transactions';
import { tradeDetailsApi } from '../services/trades';
import { setupListeners } from '@reduxjs/toolkit/query/react';

const store = configureStore({
  reducer: {
    auth: authReducer,
    profile: profileReducer,
    paymentDetails: paymentDetailsReducer,
    userAccount: userAccountReducer,
    [paymentDetailsApi.reducerPath]: paymentDetailsApi.reducer,
    [profileApi.reducerPath]: profileApi.reducer,
    [userAccountApi.reducerPath]: userAccountApi.reducer,
    [transactionsApi.reducerPath]: transactionsApi.reducer,
    [tradeDetailsApi.reducerPath]: tradeDetailsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      profileApi.middleware,
      userAccountApi.middleware,
      paymentDetailsApi.middleware,
      transactionsApi.middleware,
      tradeDetailsApi.middleware 
    ),
});

setupListeners(store.dispatch);

export default store;
