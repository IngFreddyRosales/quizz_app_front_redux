import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchCurrentLeaderBoard, fetchTotalScoreByUser, createNewSeason, finishSeason, fetchCurrentSeason } from "../../api/seasons";

export const getCurrentLeaderBoardThunk = createAsyncThunk(
    'seasons/getCurrentLeaderBoard',
    async (_, { rejectWithValue }) => {
        try {
            const res = await fetchCurrentLeaderBoard();
            return res.data.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || 'Error al cargar la tabla de clasificación'
            );
        }
    }
);

export const fetchTotalScoreByUserThunk = createAsyncThunk(
    'seasons/fetchTotalScoreByUser',
    async (_, { rejectWithValue }) => {
        try {
            const res = await fetchTotalScoreByUser();
            return res.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || 'Error al cargar el puntaje total del usuario'
            );
        }
    }
)

export const fetchCurrentSeasonThunk = createAsyncThunk(
    'seasons/fetchCurrentSeason',
    async (_, { rejectWithValue }) => {
        try {
            const res = await fetchCurrentSeason();
            return res.data.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || 'Error al cargar la temporada actual'
            );
        }
    }
)

export const createNewSeasonThunk = createAsyncThunk(
    'seasons/createNewSeason',
    async (seasonData, { rejectWithValue }) => {
        try {
            const res = await createNewSeason(seasonData);
            return res.data.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || 'Error al crear la temporada'
            );
        }
    }
);

export const finishSeasonThunk = createAsyncThunk(
    'seasons/finishSeason',
    async (id, { rejectWithValue }) => {
        try {
            const res = await finishSeason(id);
            return res.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || 'Error al finalizar la temporada'
            );
        }
    }
);
