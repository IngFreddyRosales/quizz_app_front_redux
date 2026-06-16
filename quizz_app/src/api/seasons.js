import api from './axiosInstance.js'

export const fetchCurrentLeaderBoard = async () => {
    const response = await api.get('seasons/current/leaderboard');
    return response;
}

export const fetchTotalScoreByUser = async () => {
    const response = await api.get('seasons/total_score');
    return response
}

export const createNewSeason = async (seasonData) => {
    const response = await api.post('seasons/', seasonData)
    return response
}

export const finishSeason = async (id) => {
    const response = await api.put(`seasons/${id}/finish`)
    return response
}

export const fetchCurrentSeason = async () => {
    const response = await api.get('seasons/current')
    return response
}