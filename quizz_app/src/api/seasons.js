import api from './axiosInstance.js'

const fetchAllSeasons = async () => {
    const response = await api.get('seasons/');
    return response
}

const fetchCurrentLeaderBoard = async () => {
    const response = await api.get('seasons/current/leaderboard');
    return response;
}

const createNewseason = async () => {
    const response = await api.post('seasons/')
    return response
}

const finishSeason = async (id) => {
    const response = await api.put(`seasons/${id}/finish`)
    return response
}   