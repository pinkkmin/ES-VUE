/*
 * @Descripttion: 
 * @Date: 2020-09-12 14:51:12
 */
import request from '@/utils/request'
export function queryMatchInfo(data_) {
    return request({
      url: 'api/manager/queryMatch',
      method: 'post',
      data:data_
    })
 }
 export function queryPlayers(data_) {
    return request({
      url: 'api/manager/queryPlayer',
      method: 'post',
      data:data_
    })
 }
 export function queryFreePlayers(data_) {
  return request({
    url: 'api/manager/queryFreePlayers',
    method: 'post',
    data:data_
  })
}
export function addFreePlayers(data_) {
  return request({
    url: 'api/manager/addPlayers',
    method: 'post',
    data:data_
  })
}
 export function editPlayer(data_) {
  return request({
    url: 'api/team/editPlayer',
    method: 'post',
    data:data_
  })
}
export function createPlayer(data_) {
  return request({
    url: 'api/manager/createPlayer',
    method: 'post',
    data:data_
  })
}
export function dealPlayer(data_) {
  return request({
    url: 'api/manager/dealPlayer',
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
//////////////
export function editMatch(data_) {
  return request({
    url: 'api/manager/editMatch',
    method: 'post',
    data:data_
  })
}
export function editMatchData(data_) {
  return request({
    url: 'api/manager/editMatchData',
    method: 'post',
    data:data_
  })
}
///// 查询-未录入数据的比赛
export function queryNoMatch(data_) {
  return request({
    url: 'api/manager/queryNoMatch',
    method: 'post',
    data:data_
  })
}

//// 录入赛事数据
export function insertMatchData(data_) {
  return request({
    url: 'api/manager/insertMatchData',
    method: 'post',
    data:data_
  })
}