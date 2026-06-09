import { createSlice } from '@reduxjs/toolkit';
import { login, register } from '../thunks/authThunks';

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user:   JSON.parse(localStorage.getItem('user')) || null,
        token:  localStorage.getItem('token') || null,
        status: 'idle',
        error:  null,
    },
    reducers: {
        logout: (state) => {
            state.user   = null;
            state.token  = null;
            state.status = 'idle';
            localStorage.removeItem('token');
            localStorage.removeItem('user');
        },
    },
    extraReducers: (builder) => {
        [login, register].forEach((thunk) => {
            builder
                .addCase(thunk.pending, (state) => {
                    state.status = 'loading';
                    state.error  = null;
                })
                .addCase(thunk.fulfilled, (state, action) => {
                    state.status = 'succeeded';
                    state.token  = action.payload.token;
                    state.user   = action.payload.user;
                    localStorage.setItem('token', action.payload.token);
                    localStorage.setItem('user', JSON.stringify(action.payload.user));
                })
                .addCase(thunk.rejected, (state, action) => {
                    state.status = 'failed';
                    state.error  = action.payload;
                });
        });
    },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;