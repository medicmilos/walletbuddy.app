import { baseRequest } from "./api"
import { API_TOKEN, REFRESH_TOKEN } from "./config"

export const getToken = () => {
  return localStorage.getItem(API_TOKEN)
}

export const getRefreshToken = () => {
  return localStorage.getItem(REFRESH_TOKEN)
}

export const setToken = token => {
  localStorage.setItem(API_TOKEN, token)
}

export const setRefreshToken = token => {
  localStorage.setItem(REFRESH_TOKEN, token)
}

export const unsetToken = () => {
  localStorage.removeItem(API_TOKEN)
}

export const unsetRefreshToken = () => {
  localStorage.removeItem(REFRESH_TOKEN)
}

export const setAxiosToken = () => {
  baseRequest.defaults.headers["Authorization"] = "Bearer " + getToken()
}

export default {
  getToken,
  setToken,
  unsetToken,
  getRefreshToken,
  setRefreshToken,
  setAxiosToken,
  unsetRefreshToken
}
