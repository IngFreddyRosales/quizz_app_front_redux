import api from './axiosInstance';

export const registerApi = async (userData) => {
    const response = await api.post('auth/register', userData);
    return response.data;


};

export const loginApi = async (userData) => {
    const response = await api.post('auth/login', userData);
    return response.data;

};