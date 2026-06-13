import { createSlice } from '@reduxjs/toolkit';
import {
    startQuizSession,
    fetchQuestions,
    submitAnswer,
    finishQuizSession,
    abandonQuizSession,
} from '../thunks/quizThunks';

const quizSlice = createSlice({
    name: 'quiz',
    initialState: {
        sessionId:            null,
        activeSessionConflict: null,  // { session_id } cuando backend devuelve 400
        totalQuestions:       0,
        questions:            [],     // [{ id, question_text, QuestionOptions }]
        currentQuestionIndex: 0,
        answers:              [],     // [{ question_id, selected_option_id, is_correct, earned_points, correct_option }]
        answerFeedback:       null,   // feedback de la última respuesta enviada
        result:               null,   // { session, stats, season_stats, unlocked_achievements }
        status:               'idle', // 'idle' | 'loading' | 'submitting' | 'succeeded' | 'failed'
        error:                null,
    },
    reducers: {
        nextQuestion: (state) => {
            if (state.currentQuestionIndex < state.questions.length - 1) {
                state.currentQuestionIndex += 1;
            }
            state.answerFeedback = null; // limpia el feedback al avanzar
        },
        resumeSession: (state, action) => {
            state.sessionId = action.payload;
            state.activeSessionConflict = null;
            state.status = 'succeeded';
            state.error = null;
        },
        clearFeedback: (state) => {
            state.answerFeedback = null;
        },
        resetQuiz: (state) => {
            state.sessionId            = null;
            state.activeSessionConflict = null;
            state.totalQuestions       = 0;
            state.questions            = [];
            state.currentQuestionIndex = 0;
            state.answers              = [];
            state.answerFeedback       = null;
            state.result               = null;
            state.status               = 'idle';
            state.error                = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // ── startQuizSession ──────────────────────────
            .addCase(startQuizSession.pending, (state) => {
                state.status = 'loading';
                state.error  = null;
            })
            .addCase(startQuizSession.fulfilled, (state, action) => {
                state.status         = 'succeeded';
                state.sessionId      = action.payload.id;
                state.totalQuestions = action.payload.total_questions;
            })
            .addCase(startQuizSession.rejected, (state, action) => {
                state.status = 'failed';
                // Si el payload contiene session_id, hay sesión activa
                if (action.payload?.session_id) {
                    state.activeSessionConflict = { session_id: action.payload.session_id };
                    state.error = action.payload.message || 'Ya existe una sesión activa';
                } else {
                    state.error = action.payload;
                }
            })

            // ── fetchQuestions ────────────────────────────
            .addCase(fetchQuestions.pending, (state) => {
                state.status = 'loading';
                state.error  = null;
            })
            .addCase(fetchQuestions.fulfilled, (state, action) => {
                state.status               = 'succeeded';
                state.questions            = action.payload;
                state.currentQuestionIndex = 0;
                state.answers              = [];
                state.answerFeedback       = null;
            })
            .addCase(fetchQuestions.rejected, (state, action) => {
                state.status = 'failed';
                state.error  = action.payload;
            })

            // ── submitAnswer ──────────────────────────────
            .addCase(submitAnswer.pending, (state) => {
                state.status = 'submitting'; // estado especial para deshabilitar opciones
            })
            .addCase(submitAnswer.fulfilled, (state, action) => {
                state.status         = 'succeeded';
                state.answerFeedback = action.payload; // { is_correct, earned_points, correct_option }
                state.answers.push(action.payload);    // guarda historial local
            })
            .addCase(submitAnswer.rejected, (state, action) => {
                state.status = 'failed';
                state.error  = action.payload;
            })

            // ── finishQuizSession ─────────────────────────
            .addCase(finishQuizSession.pending, (state) => {
                state.status = 'loading';
                state.error  = null;
            })
            .addCase(finishQuizSession.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.result = action.payload; // { session, stats, season_stats, unlocked_achievements }
            })
            .addCase(finishQuizSession.rejected, (state, action) => {
                state.status = 'failed';
                state.error  = action.payload;
            })

            // ── abandonQuizSession ────────────────────────
            .addCase(abandonQuizSession.fulfilled, (state) => {
                state.status    = 'idle';
                state.sessionId = null;
            });
    },
});

export const { nextQuestion, clearFeedback, resetQuiz, resumeSession } = quizSlice.actions;
export default quizSlice.reducer;