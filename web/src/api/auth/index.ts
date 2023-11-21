/*
 * @Author: Luna
 * @Date: 2023-11-21 14:49:16
 * @Description:
 */

import http from '../http';

/**
 * 登录
 * @param params 用户登录参数
 */
export function login(params: any) {
  return http.post('/login', params);
}
