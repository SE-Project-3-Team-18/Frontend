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

const profile = async () => {
  console.log(config())
  const url = new URL('/api/profile', baseUrl).toString()
  const response = await axios.get(url, config())
  return response.data
}

export const serverFunctions = {
  resetToken,
  setToken,
  signUp,
  signIn,
  profile,
}