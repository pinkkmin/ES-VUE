/*
 * @Descripttion: 
 * @Date: 2020-07-22 16:31:14
 */
/*
 * @Descripttion:
 * @Date: 2020-07-22 16:31:14
 */
import request from '@/utils/request'
import {getToken} from '@/utils/auth'
export function login(data) {
  return request({
    url: 'login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: 'api/user/info',
    method: 'get',
    headers: {
      'Authorization': token
    }
  })
}
export function altInfo(parms) {
  return request({
    url: 'api/user/altInfo',
    method: 'post',
    data:parms
  })
} 
export function altPwd(parms) {
  return request({
    url: 'api/user/altpwd',
    method: 'post',
    data:parms
  })
}

export function logout() {
  return request({
    url: 'api/user/logout',
    method: 'post',
    headers: {
      'Authorization': getToken()
    }
  })
}
