import axios from 'axios'
const baseUrl = "http://localhost:3000"

let token = window.localStorage.getItem('Greddit:token') || null

const resetToken = () => {
    token = null
    return
}

const config = () => {
    return {
        headers: { Authorization: token }
    }
}

const setToken = (user) => {
    if (user === null) {
        token = null
        return
    }
    token = `${user.token}`
}


const signUp = async (body) => {
  const url = new URL('/api/auth/signUp', baseUrl).toString()
  const response = await axios.post(url, body)
  return response.data
}

const signIn = async (body) => {
  const url = new URL('/api/auth/signIn', baseUrl).toString()
  const response = await axios.post(url, body)
  return response.data
}

const activate = async (body) => {
  const url = new URL('/api/auth/activate', baseUrl).toString()
  const response = await axios.post(url, body)
  return response.data
}

const profile = async () => {
  console.log(config())
  const url = new URL('/api/profile', baseUrl).toString()
  const response = await axios.get(url, config())
  return response.data
}

const registerForSeller = async (body) => {
  const url = new URL('/api/seller', baseUrl).toString()
  const response = await axios.post(url, body, config())
  return response.data
}

const getSellerDetails = async () => {
  const url = new URL('/api/seller', baseUrl).toString()
  const response = await axios.get(url, config())
  return response.data
}

const getNotifications = async () => {
  const url = new URL('/api/notification', baseUrl).toString()
  const response = await axios.get(url, config())
  return response.data
}

const readNotification = async (notifId) => {
  const url = new URL(`/api/notification/read`, baseUrl).toString()
  const response = await axios.post(url, {
    notificationId: notifId,
  }, config())
  return response.data
}

export const serverFunctions = {
  resetToken,
  setToken,
  signUp,
  signIn,
  activate,
  profile,
  registerForSeller,
  getSellerDetails,
  getNotifications,
  readNotification,
}