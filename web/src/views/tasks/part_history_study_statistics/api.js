/*
 * @Author: sky-eve-yang
 * @Date: 2023-03-09 21:19:21
 * @LastEditTime: 2023-03-12 15:37:37
 * @LastEditors: sky 1326906378@qq.com
 * @Description: 
 * @FilePath: \django-vue-admin\web\src\views\tasks\party_history_study\api.js
 * @签名：清风无意，忘川归心
 */
 
import { request, downloadFile } from '@/api/service'
export const urlPrefix = '/api/party_history_study_statistics/'

export function GetList(query) {
  return request({
    url: urlPrefix,
    method: 'get',
    params: query
  })
} 


export function GetDeptList (query) {
  // query.limit = 999;
  return request({
    url: '/api/system/dept/',
    method: 'get',
    params: query
  })
}
