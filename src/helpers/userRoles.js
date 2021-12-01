import { USER, USER_ROLE } from "../api/config"

export const setUserRole = role => {
  localStorage.setItem(USER_ROLE, role)
}

export const getUserRole = () => {
  return localStorage.getItem(USER_ROLE)
}

export const unsetUserRole = () => {
  localStorage.removeItem(USER_ROLE)
}
export const setUser = user => {
  localStorage.setItem(USER, JSON.stringify(user))
}

export const getUser = () => {
  return JSON.parse(localStorage.getItem(USER))
}

export const unsetUser = () => {
  localStorage.removeItem(USER)
}

export default {
  setUserRole,
  getUserRole,
  unsetUserRole,
  setUser,
  getUser,
  unsetUser
}
