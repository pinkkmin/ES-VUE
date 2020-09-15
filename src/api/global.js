/*
 * @Descripttion: 
 * @Date: 2020-08-25 20:11:32
 */
/*
 * @Descripttion: 
 * @Date: 2020-08-25 20:11:32
 */

import request from '@/utils/request'

export function getCurSeason() {
  return request({
    url: '/api/global/curSeason',
    method: 'get'
  })
}
// get seasonList 获取赛季名称列表
export function getSeasonList() {
  return request({
    url: 'api/global/seasonList',
    method: 'get',
  })
}
export function getTeamList(){
  return request({
    url: '/api/global/teamList',
    method: 'get'
  })
}
export function getMatchsByDay(data_){
  return request({
    url: '/api/global/matchByDay',
    method: 'post',
    data:data_
  })
}
export function updateFile(file_csv,parse_) {
  return request({
    url: '/api/global/updateFile',
    method: 'post',
    data: file_csv,parse_

  })
}
export function doKeyNumber(data_) {
  return request({
    url: '/api/global/getKeyNumber',
    method: 'post',
    data:data_

  })
}
export function regKeyNumber(data_) {
  return request({
    url: '/api/global/regKeyNumber',
    method: 'post',
    data:data_

  })
}
export function resetPwd(data_) {
  return request({
    url: '/api/global/resetPwd',
    method: 'post',
    data:data_

  })
}
export function register(data_) {
  return request({
    url: '/api/global/register',
    method: 'post',
    data:data_

  })
}