import request from '@/utils/request'

export function getTeamList() {
  return request({
    url: 'http://localhost:8080/api/teamList',
    method: 'get'
  })
}
