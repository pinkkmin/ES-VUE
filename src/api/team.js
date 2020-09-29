/*
 * @Descripttion: 
 * @Date: 2020-08-04 17:27:34
 */
import request from '@/utils/request'

export function getTeamList() {
  return request({
    url: 'api/teamList',
    method: 'get'
  })
}
/* 说明: 特定球队的本赛季-赛事赛程-按月份分组
 {
	"teamId": "cba2020008",
	"season": "2019-2020"
}
*/
export function getMatchs(data_) {
  return request({
    url: 'api/global/teamMatchs',
    method: 'post',
    data:data_
  })
}
export function getPlayers(data_) {
  return request({
    url: 'api/team/playerArray',
    method: 'post',
    data:data_
  })
}
export function getTeamInfo(data_) {
  return request({
    url: 'api/team/info',
    method: 'post',
    data:data_
  })
}
export function getTeamSortInfo(data_) {
  return request({
    url: 'api/global/teamInfo',
    method: 'post',
    data:data_  
  })
}
export function lastSevenMatch(data_) {
  return request({
    url: 'api/team/analysis/lastSeven',
    method: 'post',
    data:data_
  })
}

export function lastSeasonMatch(data_) {
  return request({
    url: 'api/team/analysis/lastSeason',
    method: 'post',
    data:data_
  })
}
export function lastSeasonAvg(data_) {
  return request({
    url: 'api/team/analysis/season',
    method: 'post',
    data:data_
  })
}

export function compareTeam(data_) {
  return request({
   // url: 'http://47.97.192.85:8080/api/team/compare/teams',
    url: 'api/team/compare/teams',
    method: 'post',
    data:data_
  })
}
export function comparePlayer(data_) {
  return request({
    url: 'api/team/compare/players',
    method: 'post',
    data:data_
  })
}
export function compareMatch(data_) {
  return request({
    url: 'api/team/compare/vs',
    method: 'post',
    data:data_
  })
}

/**Manager team***/
export function getPlayersByTeamId(data_) {
  return request({
    url: 'api/global/playerList',
    method: 'post',
    data:data_
  })
}

export function teamService(data_) {
  return request({
    url: 'api/manager/service',
    method: 'post',
    data:data_
  })
}
export function queryService(data_) {
  return request({
    url: 'api/manager/queryService',
    method: 'post',
    data:data_
  })
}