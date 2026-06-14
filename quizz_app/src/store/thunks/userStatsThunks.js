import { createAsyncThunk } from '@reduxjs/toolkit'
import { getUserStats } from '../../api/userStats.js'

export const getUserStatsThunk = createAsyncThunk(
    'userStats/getUserStats',
    async (_, { rejectWithValue }) => {
        try {
            const response = await getUserStats()
            return response.data.data
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Error al obtener estadísticas del usuario')
        }
    }
)