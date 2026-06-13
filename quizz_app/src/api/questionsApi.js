import api from './axiosInstance';

export const getQuestionsByCategoryApi = (category_id) =>
    api.get(`questions/${category_id}`);