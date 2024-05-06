import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../../api';

export const adminApi = createApi({
  reducerPath: 'adminApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    getAllAdmins: builder.query({
      query: (token) => ({
        url: '/admin/super-admin/get-all-admins',
        headers: {
          'Content-Type': 'application/json',
          'x-token': token,
        },
      }), 
    }),
    getSingleAdmin: builder.query({
      query: ({ id, adminToken }) => {
        return {
          url: `/admin/super-admin/view-admin/${id}`,
          headers: {
            'Content-Type': 'application/json',
            'x-token': adminToken,
          },
        };
      },
    }), 
    getAllUsers: builder.query({
      query: (token) => ({
        url: '/admin/user/get-all-users',
        headers: {
          'Content-Type': 'application/json',
          'x-token': token,
        },
      }), 
    }),
    getSingleUser: builder.query({
      query: ({ id, adminToken }) => {
        return {
          url: `/admin/user/view-user/${id}`,
          headers: {
            'Content-Type': 'application/json',
            'x-token': adminToken,
          },
        };
      },
    }),
    assignUserToAdmin: builder.mutation({
      query: ({ userId, adminId, adminToken, assign }) => ({
        url: `/admin/super-admin/assign-user-to-admin/?user_id=${userId}&admin_id=${adminId}&assign_task=${assign}`,
        method: "PUT",
        headers: {
          'Content-Type': 'application/json',
          'x-token': adminToken,
        },
      }),
    }),
    updateUserTransaction: builder.mutation({
      query:({token, user_id, transaction_id, transaction_status}) => {
        return{
          url: `/admin/user/change-transaction-status/${transaction_id}/?user_id=${user_id}&status_=${transaction_status}`,
          method: "PUT", 
          headers: {
            'Content-Type': 'application/json',
            'x-token': token,
          }

        }
      }
    }),
    makeNewTransaction: builder.mutation({
      query:({token, user_id, amount, balance_type, transaction_type}) => {
        return{
          url: `/admin/user/make-transaction/?user_id=${user_id}&amount=${amount}&balance_type=${balance_type}&transaction_type=${transaction_type}`,
          method: "POST", 
          headers: {
            'Content-Type': 'application/json',
            'x-token': token,
          }

        }
      }
    }),
  editUseretails: builder.mutation({
    query: ({token, user_id, userDetails}) => {
      return{
        url: `/admin/user/edit-user-details/${user_id}`, 
        method: "POST", 
        headers: {
          'Content-Type': 'application/json',
          'x-token': token,
        }, 
        body: userDetails
      }
    }
  }), 
  resetUserPassword: builder.mutation({
    query: ({token, user_id}) => {
      return{
        url:`/admin/user/reset-user-password/${user_id}`, 
        method: "POST", 
        headers: {
          'Content-Type': 'application/json',
          "x-token": token
        }
      }
    }
  }), 
  createBankDetails: builder.mutation({
    query: ({ token, key, bank_name, account_name, iban, bic, reference }) => {
      const queryString = new URLSearchParams({
        key,
        bank_name,
        account_name,
        iban,
        bic,
        reference
      }).toString();
  
      return {
        url: `/admin/finance-details/create-bank-details/?${queryString}`,
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'x-token': token,
        }
      }
    }
  }),
  
  editBankDetails: builder.mutation({
    query: ({token, bank_id, key, bankDetails})=> {
      return{
        url: "",
        method: "PUT", 
        headers: {
          'Content-Type': 'application/json',
          'x-token': token,
        }, 
        body: bankDetails
      }
    }
  }), 
  createCryptoDetails: builder.mutation({
    query: ({token}) => {
      return{
        url: "",
        method: "POST"
      }
    }
  }), 
  editCryptoDetails: builder.mutation({
    query: ({token}) => {
      return{
        url: "",
        method: "PUT", 
        headers: {
          'Content-Type': 'application/json',
          'x-token': token,
        }
      }
    }
  }), 
  loginUser: builder.mutation({
    query: ({token, user_id}) => {
      return{
        url: `/admin/user/login-user/${user_id}`,
        method: "POST", 
        headers: {
          'Content-Type': 'application/json',
          "x-token": token
        }
      }
    }
  }), 
  getAllLeads: builder.query({
    query: (token) => {
      return{
      url: "/admin/crm/get-all-leads/", 
      headers: {
          'Content-Type': 'application/json',
          'x-token': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoxLCJ1c2VyX3R5cGUiOiJzdXBlcl9hZG1pbiIsImV4cCI6MTcxNDk2NTAwOX0.kYrYAQw_LuVQzYECOKXQoRJnQ9WhBY-gDQQaKsBoxDw",
        }
      }
    }
  }), 
  getSingleLead: builder.query({
    query: ({token, lead_id}) => {
      return{
        url: `/admin/crm/get-lead/${lead_id}`, 
        headers: {
          "x-token": token
        }
      }
    }
  }), 
    editLead: builder.mutation({
      query:({token, firstName, lastName, email, phoneNumber, status, country, address, dateOfBirth, activated, lead_id}) =>{
        const queryParams = new URLSearchParams({
          email,
          first_name: firstName,
          last_name: lastName,
          address,
          country,
          phone_number: phoneNumber,
          date_of_birth: dateOfBirth,
          status,
          activated: activated.toString() // Convert boolean to string
      });
        return{
          url: `/admin/crm/edit-lead/${lead_id}?${queryParams.toString()}`, 
          method: "PUT", 
          headers: {
            'Content-Type': 'application/json',
            'x-token': token,
          }
        }
      }
    }), 
    createLead: builder.mutation({
      query: ({ token, formData }) => {
        const queryParams = new URLSearchParams({
          first_name: formData.firstName,
          last_name: formData.lastName,
          email: formData.email,
          phone_number: formData.phoneNumber,
          status: formData.status,
          country: formData.country,
          address: formData.address,
          date_of_birth: formData.dateOfBirth,
          activated: formData.activated,
          created_at: formData.createdAt
        });
    
        const url = `/admin/crm/create-lead/?${queryParams.toString()}`;
    
        return {
          url,
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
            'x-token': token,
          }
        }
      }
    })
  }),
});

export const { 
  useGetAllAdminsQuery, 
  useGetSingleAdminQuery, 
  useGetAllUsersQuery, 
  useGetSingleUserQuery,
  useUpdateUserTransactionMutation,
  useAssignUserToAdminMutation, useMakeNewTransactionMutation, useEditUseretailsMutation, useResetUserPasswordMutation, useCreateBankDetailsMutation, useLoginUserMutation, 
  useGetAllLeadsQuery, 
  useGetSingleLeadQuery, useEditLeadMutation, useCreateLeadMutation
} = adminApi;
