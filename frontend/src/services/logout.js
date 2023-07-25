import axios from 'axios'
const baseUrl = '/api/users'

const logout = async credentials => {
  const response = await axios.delete(`${baseUrl}/logout`);
  return response.data;
}

export default { logout }