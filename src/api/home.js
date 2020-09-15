/*
 * @Descripttion: home&public API
 * @Date: 2020-08-25 16:37:21
 */
import request from '@/utils/request'

/** API for home page **/
//积分榜
export function teamSortList(parse) {
  return request({
    url: '/api/home/sort',
    method: 'post',
    data:parse
  })
}

//今日赛事
export function getTodayMatch() {
  return request({
    url: '/api/home/todayMatch',
    method: 'get'
  })
}
 
/**API for public part */

//for team
export function getTeamFisrtCard(parse) {
  return request({
    url: '/api/public/team/first',
    method: 'post',
    data:parse
  })
}
export function getTeamSecondCard(parse) {
  return request({
    url: '/api/public/team/second',
    method: 'post',
    data:parse
  })
}
export function getTeamThirdCard(parse) {
  return request({
    url: '/api/public/team/third',
    method: 'post',
    data:parse
  })
}
//for match
export function getMatchInfo(parse) {
  return request({
    url: '/api/public/match',
    method: 'post',
    data:parse
  })
}

//for player
export function getPlayerInfo(parse) {
  return request({
    url: '/api/public/player',
    method: 'post',
    data:parse
  })
}
export function getPlayerSeasonData(parse) {
  return request({
    url: '/api/public/player/season',
    method: 'post',
    data:parse
  })
}