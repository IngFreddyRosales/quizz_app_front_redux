import api from './axiosInstance.js'

export const getUserAchievements = async () => {
    return await api.get('user_achievements/')
}