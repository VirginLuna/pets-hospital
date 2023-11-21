/*
 * @Author: Luna
 * @Date: 2023-11-20 15:43:16
 * @Description:
 */

import { Result } from 'antd';

export default function NotFound() {
  return <Result status='404' title='404' subTitle='Sorry, the page you visited does not exist.' />;
}
