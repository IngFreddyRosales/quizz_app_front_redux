import { createAsyncThunk } from '@reduxjs/toolkit';
import {
    createQuizSessionApi, answerQuestionApi,
    finishQuizSessionApi, abandonQuizSessionApi
} from '../../api/quizSession';
import { getQuestionsByCategoryApi } from '../../api/questionsApi';

// 1. Crea la sesión → guarda el sessionId
export const startQuizSession = createAsyncThunk(
    'quiz/startSession',
    async (categoryId, { rejectWithValue }) => {
        try {
            const res = await createQuizSessionApi(categoryId);
            return res.data.data;
            // devuelve: { id, category_id, total_questions, status, started_at, ... }
        } catch (error) {
            const errData = error.response?.data;
            // Si el backend devuelve session_id (sesión activa), propagar todo el objeto
            if (errData?.session_id) {
                return rejectWithValue(errData);
            }
            return rejectWithValue(errData?.message || 'Error al iniciar la sesión');
        }
    }
);

// 2. Trae las preguntas con sus opciones
export const fetchQuestions = createAsyncThunk(
    'quiz/fetchQuestions',
    async (categoryId, { rejectWithValue }) => {
        try {
            const res = await getQuestionsByCategoryApi(categoryId);
            return res.data.data;
            // devuelve: [{ id, question_text, QuestionOptions: [...] }]
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || 'Error al cargar las preguntas'
            );
        }
    }
);

// 3. Envía la respuesta de cada pregunta individualmente
export const submitAnswer = createAsyncThunk(
    'quiz/submitAnswer',
    async ({ session_id, question_id, selected_option_id, response_time_ms }, { rejectWithValue }) => {
        try {
            const res = await answerQuestionApi({
                session_id,
                question_id,
                selected_option_id,
                response_time_ms,
            });
            return { question_id, selected_option_id, ...res.data.data };
            // devuelve: { question_id, selected_option_id, is_correct, earned_points, correct_option }
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || 'Error al enviar la respuesta'
            );
        }
    }
);

// 4. Finaliza la sesión → devuelve resultado completo
export const finishQuizSession = createAsyncThunk(
    'quiz/finishSession',
    async (sessionId, { rejectWithValue }) => {
        try {
            const res = await finishQuizSessionApi(sessionId);
            return res.data.data;
            // devuelve: { session, stats, season_stats, unlocked_achievements }
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || 'Error al finalizar la sesión'
            );
        }
    }
);

// 5. Abandona la sesión (botón salir)
export const abandonQuizSession = createAsyncThunk(
    'quiz/abandonSession',
    async (sessionId, { rejectWithValue }) => {
        try {
            const res = await abandonQuizSessionApi(sessionId);
            return res.data.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || 'Error al abandonar la sesión'
            );
        }
    }
);