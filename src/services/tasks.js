import axios from "axios"
const baseUrl = '/api/tasks'

let token = null
const setToken = (newToken) => {
  token = `Bearer ${newToken}`
}

const create = async (obj) => {
  const response = await axios.post(baseUrl, obj, {
    headers: { Authorization: token }
  })

  return response.data
}

const getAll = async (id) => {
  const response = await axios.get(`${baseUrl}/user/${id}`)
  return response.data
}

const update = async (id, obj) => {
  const response = await axios.put(`${baseUrl}/${id}`, obj, {
    headers: { Authorization: token }
  })

  return response.data
}

const remove = async (id) => {
  const response = await axios.delete(`${baseUrl}/${id}`, {
    headers: { Authorization: token }
  })
  return response.data
}

export default { create, setToken, getAll, update, remove }