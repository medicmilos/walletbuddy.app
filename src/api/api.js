import axios from "axios"
import JwtService from "./jwtService"
import { BASE_URL } from "./config"
import api from "./apiCalls"

let baseRequest

baseRequest = axios.create({
  baseURL: BASE_URL,
  withCredentials: false,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json"
  }
})

baseRequest.interceptors.request.use(
  config => {
    config.headers["Authorization"] = "Bearer " + JwtService.getToken()
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

baseRequest.interceptors.response.use(
  response => response,
  error => {
    const refreshToken = JwtService.getRefreshToken()

    if (error.response.status !== 401) {
      return new Promise((resolve, reject) => {
        reject(error)
      })
    }
    if (error.config.url.includes("/refresh")) {
      return Promise.reject(error)
    }

    return api
      .getNewApiToken({ refresh_token: refreshToken })
      .then(response => {
        JwtService.setToken(response.access_token)
        JwtService.setRefreshToken(response.refresh_token)
        JwtService.setAxiosToken()
        error.config.headers["Authorization"] =
          "Bearer " + response.access_token

        return baseRequest.request(error.config)
      })
      .catch(err => {
        console.log("err: ", err)
        JwtService.unsetToken()
        JwtService.unsetRefreshToken()
        window.location.reload()
        return Promise.reject(error.response.status)
      })
  }
)

export { baseRequest, axios }
