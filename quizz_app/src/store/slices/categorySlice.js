import { createSlice } from '@reduxjs/toolkit';
import { fetchCategories } from '../thunks/categoriesThunks';

const categorySlice = createSlice({
    name: 'categories',
    initialState: {
        list: [],
        status: 'idle',
        error: null,
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCategories.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchCategories.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.list = action.payload;
            })
            .addCase(fetchCategories.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            });
    }
});

export default categorySlice.reducer;