import React, {useEffect} from 'react'
import { Form, Input } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { onRegister } from '../Redux/Auth/authAction'

const Register = () => {
    let history = useHistory();
    const dispatch = useDispatch();
  

    const onFinish = (values) => {
        let data = {
            username: values.username,
            password: values.password
        }

        dispatch(onRegister(data, history))
    };

    return (
        <div className='container'>
            <h1 className='text-center mt-4'>Register</h1>
            <div className='login-form my-5'>
                <Form
                    name="normal_register"
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
                                rules={[{ required: true, message: 'Please input your Password!' }, { min: 6, message: 'Pasword must be minimum 6 characters.' }]}
                            >
                                <Input.Password
                                    prefix={<LockOutlined className="site-form-item-icon" />}
                                    type="password"
                                    placeholder="Password"
                                />
                            </Form.Item>
                            <Form.Item
                                name="confirm"
                                label="Confirm Password"
                                dependencies={['password']}
                                hasFeedback
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please confirm your password!',
                                    },
                                    ({ getFieldValue }) => ({
                                        validator(_, value) {
                                            if (!value || getFieldValue('password') === value) {
                                                return Promise.resolve();
                                            }
                                            return Promise.reject(new Error('The two passwords that you entered do not match!'));
                                        },
                                    }),
                                ]}
                            >
                                <Input.Password prefix={<LockOutlined className="site-form-item-icon" />} type="password"
                                    placeholder="Confirm Password" />
                            </Form.Item>
                            <div className='d-flex justify-content-center mt-3'>
                                <button type="submit" className="btn btn-primary">Register</button>
                            </div>
                        </div>
                    </div>
                </Form>
            </div>
        </div>
    )
}

export default Register
