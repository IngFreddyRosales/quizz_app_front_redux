import { createSlice } from "@reduxjs/toolkit";
import { getCurrentLeaderBoardThunk, createNewSeasonThunk, finishSeasonThunk, fetchTotalScoreByUserThunk, fetchCurrentSeasonThunk } from "../thunks/seasonThunks.js";

const initialState = {
    leaderBoard: null,
    currentSeason: null,
    status: 'idle',
    error: null
}

const seasonsSlice = createSlice({
    name: 'seasons',
    initialState,
    reducers: {
        resetSeasons: (state) => {
            state.leaderBoard = null;
            state.currentSeason = null;
            state.status = 'idle';
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getCurrentLeaderBoardThunk.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(getCurrentLeaderBoardThunk.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.leaderBoard = action.payload.leaderboard;   // API key: "leaderboard" (lowercase)
                state.currentSeason = action.payload.season;      // API key: "season" (not "currentSeason")
            })
            .addCase(getCurrentLeaderBoardThunk.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })

            .addCase(fetchCurrentSeasonThunk.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchCurrentSeasonThunk.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.currentSeason = action.payload;
            })
            .addCase(fetchCurrentSeasonThunk.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })

            .addCase(fetchTotalScoreByUserThunk.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchTotalScoreByUserThunk.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.totalScore = action.payload.total_score;
            })
            .addCase(fetchTotalScoreByUserThunk.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })

            .addCase(createNewSeasonThunk.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(createNewSeasonThunk.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.currentSeason = action.payload;
            })
            .addCase(createNewSeasonThunk.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })

            .addCase(finishSeasonThunk.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(finishSeasonThunk.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.currentSeason = action.payload;
            })
            .addCase(finishSeasonThunk.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
    }
})

export const { resetSeasons } = seasonsSlice.actions;
export default seasonsSlice.reducer;
