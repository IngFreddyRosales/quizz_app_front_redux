import { createAsyncThunk } from "@reduxjs/toolkit";
import { getUserAchievements } from "../../api/achievements.js"

export const getUserAchievementsThunk = createAsyncThunk(
    "userAchievements/getUserAchievements",
    async (_, { rejectWithValue }) => {
        try {
            const response = await getUserAchievements();
            return response.data.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Error al obtener los logros");
        }
    }
)