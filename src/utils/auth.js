import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'

export function getToken(key) {
  return Cookies.get( key || TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
