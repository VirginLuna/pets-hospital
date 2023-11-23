/*
 * @Author: Luna
 * @Date: 2023-11-20 15:57:45
 * @Description:
 */

import { Button, Form, Input } from 'antd';
import { useNavigate } from 'react-router-dom';

import { login } from '@/api/auth';
import useLoginStore from '@/store/user';

type FieldType = {
  username?: string;
  password?: string;
  remember?: string;
};

export default function Login() {
  const navigate = useNavigate();
  const setIsLogin = useLoginStore((state: any) => state.setIsLogin);
  const onFinish = (values: any) => {
    login(values).then((res) => {
      sessionStorage.setItem('token', res.data.token);
      setIsLogin(true);
      navigate('/main');
    });
  };
  return (
    <Form
      name='basic'
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      autoComplete='off'
    >
      <Form.Item<FieldType>
        label='Username'
        name='username'
        rules={[{ required: true, message: 'Please input your username!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item<FieldType>
        label='Password'
        name='password'
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type='primary' htmlType='submit'>
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
}
