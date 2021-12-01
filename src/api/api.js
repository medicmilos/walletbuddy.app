import axios from "axios"
import jwtService from "./jwtService"

import { BASE_URL } from "./config"

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
    config.headers["Authorization"] = "Bearer " + jwtService.getToken()
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

export { baseRequest, axios }
