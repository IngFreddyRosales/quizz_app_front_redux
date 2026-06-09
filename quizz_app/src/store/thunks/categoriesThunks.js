import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchCategoriesApi } from '../../api/categoryApi';

export const getCategories = createAsyncThunk(
    'categories/',
    async()
)