import { createSlice } from "@reduxjs/toolkit";
import { getUserAchievementsThunk } from "../thunks/achievementsThunks.js";

const userAchievementsSlice = createSlice({
    name: "userAchievements",
    initialState: {
        loading: false,
        list: [],
        total: 0,
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getUserAchievementsThunk.pending, (state) => {
                state.loading = true;
            })
            .addCase(getUserAchievementsThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.list = Array.isArray(action.payload) ? action.payload : [];
                state.total = state.list.length;
            })
            .addCase(getUserAchievementsThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
})

export const { } = userAchievementsSlice.actions
export default userAchievementsSlice.reducer