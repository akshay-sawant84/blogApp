import React, {useEffect} from 'react'
import { Form, Input } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from "react-redux";
import {onLogin } from '../Redux/Auth/authAction'
import { useHistory } from "react-router-dom";


const Login = () => {
  let history = useHistory();
  const dispatch = useDispatch();

  const onFinish = (values) => {
    let data = {
      username : values.username,
      password : values.password
    }

    dispatch(onLogin(data, history))
  };

  return (
    <div className='container'>
      <h1 className='text-center mt-4'>Login</h1>
      <div className='login-form my-5'>
        <Form
          name="normal_login"
          className='w-100'
          layout="vertical"
          className="login-form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <div className='row'>
            <div className='col-md-6 offset-md-3'>
              <Form.Item
                label='Username'
                name="username"
                rules={[{ required: true, message: 'Please input your Username!' }]}
              >
                <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
              </Form.Item>
              <Form.Item
                name="password"
                label='Password'
                rules={[{ required: true, message: 'Please input your Password!' }]}
              >
                <Input.Password
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  type="password"
                  placeholder="Password"
                />
              </Form.Item>
              <div className = 'd-flex justify-content-center mt-3'>
                <button type="submit" className="btn btn-primary">Login</button>
              </div>
            </div>
          </div>
        </Form>
      </div>
    </div>
  )
}

export default Login
