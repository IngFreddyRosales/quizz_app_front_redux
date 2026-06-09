import { createAsyncThunk } from '@reduxjs/toolkit';
import { loginApi, registerApi } from '../../api/authApi';

export const login = createAsyncThunk(
    'auth/login',
    async (credentials, { rejectWithValue }) => {
        try {
            const res = await loginApi(credentials);
            console.log("LOGUEOOOOO:", res.data)
            return res.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Error al iniciar sesión');
        }
    }
);

export const register = createAsyncThunk(
    'auth/register',
    async (userData, { rejectWithValue }) => {
        try {
            const res = await registerApi(userData);
            return res.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Error al registrarse');
        }
    }
);