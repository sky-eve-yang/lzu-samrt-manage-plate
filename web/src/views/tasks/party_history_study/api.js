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
export const urlPrefix = '/api/party_history_study/'
 
export function GetList(query) {
  return request({
    url: urlPrefix,
    method: 'get',
    params: query
  })
}

export function AddObj(obj) {
  return request({
    url: urlPrefix,
    method: 'post',
    data: obj
  })
}

export function UpdateObj(obj) {
  return request({
    url: urlPrefix + obj.id + '/',
    method: 'put',
    data: obj
  })
}

export function DelObj(id) {
  return request({
    url: urlPrefix + id + '/',
    method: 'delete',
    data: { id }
  })
}



/**
 * 导出
 * @param params
 */
export function exportData (params) {
    return downloadFile({
      url: urlPrefix + 'export_data/',
      params: params,
      filename: '党史学习',
      method: 'post'
    })
  }


  
/**
 * 审核通过
 * @param params
 */ 
export function approve (id) {
  console.log(1111);
  return request({
    url: urlPrefix +  id + '/approve/',
    data: id,
    method: 'put',
  })
}


/**
 * 审核拒绝
 * @param params
 */ 
export function reject (id) {
  console.log(1111);
  return request({
    url: urlPrefix +  id + '/reject/',
    data: id,
    method: 'put',
  })
}
