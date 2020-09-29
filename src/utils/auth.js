/*
 * @Descripttion: 
 * @Date: 2020-07-22 16:31:15
 */
import Cookies from 'js-cookie'

const TokenKey = 'token'
const userinfo = 'userInfo'
const season = "curSeason"
const teamId = 'team'
export function getTeamId() {
  return Cookies.get(teamId)
}
export function setTeamId(team) {
  return Cookies.set(teamId, team)
}

export function removeTeamId() {
  return Cookies.remove(teamId)
}
export function getToken() {
  return Cookies.get(TokenKey)
}
export function getSeason() {
  return Cookies.get(season)
}
export function getUserInfo() {
  return Cookies.get(userinfo)
}
export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function setInfo(info) {
  return Cookies.set(userinfo, info)
}
export function removeInfo() {
  return Cookies.remove(userinfo)
}

export function setSeason(seasonInfo) {
  return Cookies.set(season, seasonInfo)
}
export function removeSeason() {
  return Cookies.remove(season)
}