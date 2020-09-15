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
      url: 'http://localhost:8080/api/manager/queryNotice',
      method: 'post',
      data:data_
    })
 }
 export function queryUsers(data_) {
    return request({
      url: 'http://localhost:8080/api/manager/queryUser',
      method: 'post',
      data:data_
    })
 }