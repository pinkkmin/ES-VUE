/*
 * @Descripttion: 
 * @Date: 2020-08-25 23:50:15
 */
import request from '@/utils/request'

export function dfTeamSortList(parse) {
    parse = {season:"2019-2020"}
  return request({
    url: '/api/home/sort',
    method: 'post',
    data:parse
  })
}