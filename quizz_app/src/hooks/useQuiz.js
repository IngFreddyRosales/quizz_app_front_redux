import { useEffect, useState, useCallback, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
    startQuizSession,
    fetchQuestions,
    submitAnswer,
    finishQuizSession,
    abandonQuizSession,
} from '../store/thunks/quizThunks';
import { nextQuestion, resetQuiz, resumeSession } from '../store/slices/quizSlice';

const TIMER_SECONDS = 30;

const useQuiz = (categoryId) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // ── Redux state ─────────────────────────────────────
    const {
        sessionId,
        activeSessionConflict,
        totalQuestions,
        questions,
        currentQuestionIndex,
        answers,
        answerFeedback,
        result,
        status,
        error,
    } = useSelector((state) => state.quiz);

    // ── Local UI state ──────────────────────────────────
    const [showAbandonModal, setShowAbandonModal] = useState(false);
    const [timeLeft, setTimeLeft] = useState(TIMER_SECONDS);
    const timerRef = useRef(null);
    const questionStartRef = useRef(Date.now());
    const hasInitialized = useRef(false);

    // ── Derived values ──────────────────────────────────
    const currentQuestion = questions[currentQuestionIndex] || null;
    const isLastQuestion = currentQuestionIndex === questions.length - 1 && questions.length > 0;
    const hasAnsweredCurrent = answerFeedback !== null;
    const progressPercent = questions.length > 0
        ? Math.round(((currentQuestionIndex + (hasAnsweredCurrent ? 1 : 0)) / questions.length) * 100)
        : 0;
    const totalScore = answers.reduce((sum, a) => sum + (a.earned_points || 0), 0);

    // Timer derived
    const timerPercent = (timeLeft / TIMER_SECONDS) * 100;
    const timerStatus = timeLeft > 15 ? 'safe' : timeLeft > 5 ? 'warn' : 'danger';

    // ── Initialization ──────────────────────────────────
    useEffect(() => {
        if (hasInitialized.current) return;
        hasInitialized.current = true;

        dispatch(resetQuiz());

        const init = async () => {
            const sessionResult = await dispatch(startQuizSession(categoryId));

            if (startQuizSession.fulfilled.match(sessionResult)) {
                // Sesión creada, cargar preguntas
                dispatch(fetchQuestions(categoryId));
            }
            // Si falla con sesión activa, se maneja en el efecto de activeSessionConflict
        };

        init();

        // Cleanup: abandonar sesión si el usuario navega fuera
        return () => {
            // No podemos leer sessionId aquí directamente (closure stale),
            // así que usamos getState vía un dispatch de thunk indirecto
        };
    }, [categoryId, dispatch]);

    // ── Handle active session conflict ──────────────────
    useEffect(() => {
        if (activeSessionConflict?.session_id) {
            // Reanudar la sesión activa automáticamente
            dispatch(resumeSession(activeSessionConflict.session_id));
            dispatch(fetchQuestions(categoryId));
        }
    }, [activeSessionConflict, categoryId, dispatch]);

    // ── Timer logic ─────────────────────────────────────
    useEffect(() => {
        // Solo correr timer si hay pregunta y no se ha respondido
        if (!currentQuestion || hasAnsweredCurrent) {
            clearInterval(timerRef.current);
            return;
        }

        // Reset timer para nueva pregunta
        setTimeLeft(TIMER_SECONDS);
        questionStartRef.current = Date.now();

        timerRef.current = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    clearInterval(timerRef.current);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timerRef.current);
    }, [currentQuestionIndex, currentQuestion, hasAnsweredCurrent]);

    // ── Auto-submit when timer hits 0 ───────────────────
    useEffect(() => {
        if (timeLeft === 0 && currentQuestion && !hasAnsweredCurrent && sessionId) {
            // Enviar con la primera opción como "timeout" (sin selección real)
            // O simplemente enviar con response_time_ms = max
            const firstOption = currentQuestion.QuestionOptions?.[0];
            if (firstOption) {
                dispatch(submitAnswer({
                    session_id: sessionId,
                    question_id: currentQuestion.id,
                    selected_option_id: firstOption.id,
                    response_time_ms: TIMER_SECONDS * 1000,
                }));
            }
        }
    }, [timeLeft, currentQuestion, hasAnsweredCurrent, sessionId, dispatch]);

    // ── Cleanup on unmount ──────────────────────────────
    useEffect(() => {
        return () => {
            clearInterval(timerRef.current);
        };
    }, []);

    // ── Actions ─────────────────────────────────────────
    const handleSelectOption = useCallback((optionId) => {
        if (hasAnsweredCurrent || status === 'submitting' || !sessionId || !currentQuestion) return;

        const elapsedMs = Date.now() - questionStartRef.current;
        clearInterval(timerRef.current);

        dispatch(submitAnswer({
            session_id: sessionId,
            question_id: currentQuestion.id,
            selected_option_id: optionId,
            response_time_ms: elapsedMs,
        }));
    }, [hasAnsweredCurrent, status, sessionId, currentQuestion, dispatch]);

    const handleNextQuestion = useCallback(() => {
        dispatch(nextQuestion());
    }, [dispatch]);

    const handleFinish = useCallback(() => {
        if (sessionId) {
            dispatch(finishQuizSession(sessionId));
        }
    }, [sessionId, dispatch]);

    const handleAbandon = useCallback(() => {
        setShowAbandonModal(true);
    }, []);

    const confirmAbandon = useCallback(() => {
        if (sessionId) {
            dispatch(abandonQuizSession(sessionId));
        }
        dispatch(resetQuiz());
        setShowAbandonModal(false);
        navigate('/home');
    }, [sessionId, dispatch, navigate]);

    const cancelAbandon = useCallback(() => {
        setShowAbandonModal(false);
    }, []);

    const handleRetry = useCallback(() => {
        hasInitialized.current = false;
        dispatch(resetQuiz());
        // Re-trigger initialization
        const init = async () => {
            const sessionResult = await dispatch(startQuizSession(categoryId));
            if (startQuizSession.fulfilled.match(sessionResult)) {
                dispatch(fetchQuestions(categoryId));
            }
        };
        init();
    }, [categoryId, dispatch]);

    const handleGoHome = useCallback(() => {
        dispatch(resetQuiz());
        navigate('/home');
    }, [dispatch, navigate]);

    return {
        // Estado del quiz
        status,
        error,
        sessionId,
        questions,
        currentQuestion,
        currentQuestionIndex,
        answerFeedback,
        answers,
        result,

        // Flags derivados
        isLastQuestion,
        hasAnsweredCurrent,
        progressPercent,
        totalScore,

        // Timer
        timeLeft,
        timerPercent,
        timerStatus,

        // Acciones
        handleSelectOption,
        handleNextQuestion,
        handleFinish,
        handleAbandon,
        confirmAbandon,
        cancelAbandon,
        handleRetry,
        handleGoHome,

        // UI local
        showAbandonModal,
    };
};

export default useQuiz;
