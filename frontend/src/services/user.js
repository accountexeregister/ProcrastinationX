import axios from 'axios'
const baseUrl = '/api/users'

const getUser = async (user) => {
    const userId = user.id;
    const response = await axios.get(`${baseUrl}/${userId}`);
    return response.data;
}

const updateXp = async (user, xp) => {
  const userId = user.id;
  const response = await axios.put(`${baseUrl}/${userId}/xp/${xp}`);
  return response.data.after;
}

const updateWork = async(user, time) => {
  const userId = user.id;
  const response = await axios.put(`${baseUrl}/${userId}/stats/work/${time}`);
  const xpResponseAfter = await updateXp(user, time);
  return {
    ...response.data.after,
    ...xpResponseAfter
  }
}

const updateBreak = async (user, time) => {
  const userId = user.id;
  const response = await axios.put(`${baseUrl}/${userId}/stats/break/${time}`);
  return response.data.after;
}

const updateSettings = async (user, settings) => {
  const userId = user.id;
  const response = await axios.put(`${baseUrl}/${userId}/settings`,
    settings);
  return response.data.after;
}

const getStats = async (user) => {
  const userId = user.id;
  const response = await await axios.get(`${baseUrl}/${userId}/stats`);
}

export default { getUser, updateXp, updateSettings, updateWork, updateBreak, getStats }