import { createAsyncThunk } from '@reduxjs/toolkit';
import { getAllCategories } from '../../api/categoryApi';

export const fetchCategories = createAsyncThunk(
    'categories/fetchCategories',
    async (_, { rejectWithValue }) => {
        try {
            const res = await getAllCategories();
            return res.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Error al obtener las categorías');
        }
    }
)