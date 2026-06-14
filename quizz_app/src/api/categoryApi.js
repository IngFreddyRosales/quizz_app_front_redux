import api from './axiosInstance';

export const getAllCategories = async () => {
    const response = await api.get('categories/');
    return response.data;
    // si no carga las ctgorias añadir el .data al response

}