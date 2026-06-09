import api from './axiosInstance';

export const registerApi = async (userData) => {
    try {
        const response = await api.post('auth/register', userData);
        return response.data;
    } catch (error) {
        console.error('Register error:', error);
        throw error;
    }

};

export const loginApi = async (userData) => {
    try {
        const response = await api.post('auth/login', userData);
        return response.data;
    } catch (error) {
        console.error('Login error:', error);
        throw error;
    }
};