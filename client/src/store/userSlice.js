// src/store/userSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    token: '',
    email: '',
    name: '',
    isAuthenticated: false,
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
        },
        clearUser: (state) => {
            state.token = null;
            state.email = null;
            state.name = null;
            state.isAuthenticated = false;
        },
    },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
