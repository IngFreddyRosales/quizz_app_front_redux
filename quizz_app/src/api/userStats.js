import api from './axiosInstance.js'

export const getUserStats = async () => {
    const response = await api.get('user_stats/')
    return response
}