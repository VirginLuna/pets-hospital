/*
 * @Author: Luna
 * @Date: 2023-11-20 15:57:45
 * @Description:
 */

import { Button, Checkbox, Form, Input } from 'antd';
import { useNavigate } from 'react-router-dom';

const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo);
};

type FieldType = {
  username?: string;
  password?: string;
  remember?: string;
};

export default function Login() {
  const navigate = useNavigate();
  const onFinish = (values: any) => {
    console.log('Success:', values);
    navigate('/main');
  };
  return (
    <Form
      name='basic'
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete='off'
    >
      <Form.Item<FieldType>
        label='Username'
        name='username'
        rules={[{ required: false, message: 'Please input your username!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item<FieldType>
        label='Password'
        name='password'
        rules={[{ required: false, message: 'Please input your password!' }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item<FieldType> name='remember' valuePropName='checked' wrapperCol={{ offset: 8, span: 16 }}>
        <Checkbox>Remember me</Checkbox>
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type='primary' htmlType='submit'>
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
}
