// src/store/userSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    token: '',
    email: '',
    name: '',
    isAuthenticated: false,
    isAdmin: false,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.token = action.payload.token;
            state.email = action.payload.email;
            state.name = action.payload.name;
            state.isAuthenticated = true;
            state.isAdmin = action.payload.role && action.payload.role.includes('ROLE_ADMIN');
        },
        clearUser: (state) => {
            state.token = '';
            state.email = '';
            state.name = '';
            state.isAuthenticated = false;
            state.isAdmin = false;
        },
    },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
