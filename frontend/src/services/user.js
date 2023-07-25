import axios from 'axios'
const baseUrl = '/api/users'

const updateXp = async (user, xp) => {
  const userId = user.token.id;
  const response = await axios.put(`${baseUrl}/${userId}/${xp}`);
  return response.data.after;
}

export default { updateXp }