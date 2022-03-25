import axios from 'axios'
const baseUrl = 'http://localhost:3003/api/blogs'

let token = null;

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async (infoObject) => {
  const config = {
    headers: { Authorization: token }
  }

  const response = await axios.post(baseUrl, infoObject, config)
  return response.data
}

const deleteBlog = async (userId) => {
  const config = {
    headers: { Authorization: token }
  }

  await axios.delete(`${baseUrl}/${userId}`, config)
}

let obj = { getAll, setToken, create, deleteBlog }
export default obj