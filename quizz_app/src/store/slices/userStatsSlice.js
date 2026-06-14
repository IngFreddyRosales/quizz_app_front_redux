import { createSlice } from '@reduxjs/toolkit'
import { getUserStatsThunk } from '../thunks/userStatsThunks.js'

const initialState = {
    stats: null,
    isLoading: false,
    error: null
}

const userStatsSlice = createSlice({
    name: 'userStats',
    initialState,
    reducers: {
        resetUserStats: (state) => {
            state.stats = null
            state.isLoading = false
            state.error = null
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getUserStatsThunk.pending, (state) => {
                state.isLoading = true
                state.error = null
            })
            .addCase(getUserStatsThunk.fulfilled, (state, action) => {
                state.isLoading = false
                state.stats = action.payload
            })
            .addCase(getUserStatsThunk.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.payload
            })
    }
})

export const { resetUserStats } = userStatsSlice.actions
export default userStatsSlice.reducer;