import { createSlice } from '@reduxjs/toolkit';
const initialState = {
    auth: {
        email: '',
        idToken: '',
        localId: '',
        expiresIn: '',
        refreshToken: '',
    },
    errorMessage: '',
    successMessage: '',
    showLoading: false,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {}
});

export const {  } = authSlice.actions;
export default authSlice.reducer;
