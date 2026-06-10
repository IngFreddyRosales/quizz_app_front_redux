import { configureStore } from '@reduxjs/toolkit'
import authReducer       from './slices/authSlice';
import categoryReducer   from './slices/categorySlice';
// import quizReducer       from './slices/quizSlice';
// import userStatReducer   from './slices/userStatSlice';
// import achievementReducer from './slices/achievementSlice';
// import seasonReducer     from './slices/seasonSlice';

export const store = configureStore({
    reducer: {
        auth:        authReducer,
        categories: categoryReducer
    },
});