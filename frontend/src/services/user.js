import axios from 'axios'
const baseUrl = '/api/users'

const getUser = async (user) => {
    const userId = user.id;
    const response = await axios.get(`${baseUrl}/${userId}`);
    return response.data;
}

const updateXp = async (user, xp) => {
  const userId = user.id;
  const response = await axios.put(`${baseUrl}/${userId}/${xp}`);
  return response.data.after;
}

export default { getUser, updateXp }