import api from './axiosInstance';

export const getAllCategories = async () => {
    const response = await api.get('categories/');
    return response.data;

}