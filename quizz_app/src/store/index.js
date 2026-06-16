import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slices/authSlice';
import categoryReducer from './slices/categorySlice';
import quizReducer from './slices/quizSlice';
import userStatReducer from './slices/userStatsSlice';
import userAchievementsReducer from './slices/achievementSlice';
import seasonReducer from './slices/seasonsSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        categories: categoryReducer,
        quiz: quizReducer,
        userStats: userStatReducer,
        userAchievements: userAchievementsReducer,
        seasons: seasonReducer,
    },
}); 