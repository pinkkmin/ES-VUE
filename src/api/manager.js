/*
 * @Descripttion: 
 * @Date: 2020-09-12 14:51:12
 */
import request from '@/utils/request'
export function queryMatchInfo(data_) {
    return request({
      url: 'http://localhost:8080/api/manager/queryMatch',
      method: 'post',
      data:data_
    })
 }
 export function queryPlayers(data_) {
    return request({
      url: 'http://localhost:8080/api/manager/queryPlayer',
      method: 'post',
      data:data_
    })
 }
 export function queryNotices(data_) {
    return request({
      url: 'api/manager/queryNotice',
      method: 'post',
      data:data_
    })
 }
 export function queryUsers(data_) {
    return request({
      url: 'api/manager/queryUser',
      method: 'post',
      data:data_
    })
 }

 export function editUser(data_) {
  return request({
    url: 'api/manager/editUser',
    method: 'post',
    data:data_
  })
}
export function editTeamInfo(data_) {
  return request({
    url: 'api/team/editTeam',
    method: 'post',
    data:data_
  })
}
export function editNotice(data_) {
  return request({
    url: 'api/manager/editNotice',
    method: 'post',
    data:data_
  })
}
export function publish(data_) {
  return request({
    url: 'api/notice/create',
    method: 'post',
    data:data_
  })
}



