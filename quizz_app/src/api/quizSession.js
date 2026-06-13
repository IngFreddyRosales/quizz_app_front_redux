import api from './axiosInstance';

export const createQuizSessionApi = async (category_id) => {
    const token = localStorage.getItem('access_token');
    return await api.post(`quiz-sessions/${category_id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

export const answerQuestionApi = async (answerData) => {
    const token = localStorage.getItem('access_token');
    return await api.post('quiz-sessions/answer', answerData, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};
// answerData = { session_id, question_id, selected_option_id, response_time_ms }

export const finishQuizSessionApi = (id) =>
    api.put(`quiz-sessions/${id}/finish`);

export const abandonQuizSessionApi = (id) =>
    api.put(`quiz-sessions/${id}/abandon`);