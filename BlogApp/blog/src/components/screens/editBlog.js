import React, { useEffect } from 'react'
import { Form, Input } from 'antd';
import {
    useParams
} from "react-router-dom";
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useHistory } from "react-router-dom";

const EditBlog = () => {
    let { id } = useParams();
    const [form] = Form.useForm();
    let history = useHistory();
    useEffect(() => {

        let token = localStorage.getItem('jwtToken');
        let dataToken = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }

        axios.get(`http://localhost:5000/api/blog-details/${id}`, dataToken).then((res) => {
            if (res.status === 200) {
                const { data } = res.data
                form.setFieldsValue({
                    title: data.title,
                    description: data.description
                })
            } else {
                toast.error(res.data.description, {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }
        }).catch((err) => {
            toast.error(err.response && err.response.data.description, {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        })
    }, [id])



    const onFinish = (values) => {

        let data = {
            title: values.title,
            description: values.description
        }

        let token = localStorage.getItem('jwtToken');
        let dataToken = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }

        axios.put(`http://localhost:5000/api/blog/edit/${id}`, data, dataToken).then((res) => {
            if (res.status === 200) {
                history.push('/')
            } else {
                toast.error(res.data.description, {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }
        }).catch((err) => {
            toast.error(err.response && err.response.data.description, {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        })
    };

    return (
        <div className='container'>
            <h1 className='text-center mt-4'>Edit Blog</h1>
            <div className='login-form my-5'>
                <Form
                    form={form}
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
                                label='Title'
                                name="title"
                                rules={[{ required: true, message: 'Please input your title!' }]}
                            >
                                <Input placeholder="Title" />
                            </Form.Item>
                            <Form.Item
                                name="description"
                                label='Description'
                                rules={[{ required: true, message: 'Please input your description!' }]}
                            >
                                <Input.TextArea />
                            </Form.Item>
                            <div className='d-flex justify-content-center mt-3'>
                                <button type="submit" className="btn btn-primary">Edit</button>
                            </div>
                        </div>
                    </div>
                </Form>
            </div>
        </div>
    )
}

export default EditBlog
