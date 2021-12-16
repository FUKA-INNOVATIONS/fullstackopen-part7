import axios from 'axios'
const baseUrl = '/api/users'


const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data

}

const getDetails = async (userId) => {
  const response = await axios.get(`${baseUrl}/${userId}`)
  return response.data
}

const userService =  { getAll }

export default userService