import React, { useEffect, useState } from 'react'
import {
    RightOutlined
} from '@ant-design/icons';
import { Avatar, Button } from 'antd';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useHistory } from "react-router-dom";

const Blogs = () => {
    let history = useHistory();
    const [blogData, setblogData] = useState([])

    useEffect(() => {
        axios.get('http://localhost:5000/api/blog').then((res) => {
            if (res.status === 200) {
                setblogData(res.data.data)
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
            console.log(err)
            // toast.error(err.response && err.response.data.description, {
            //     position: "top-center",
            //     autoClose: 5000,
            //     hideProgressBar: false,
            //     closeOnClick: true,
            //     pauseOnHover: true,
            //     draggable: true,
            //     progress: undefined,
            // });
        })
    }, [])

    return (
        <div className='container my-5'>
            <h1 className='text-center mb-5'>Blogs</h1>
            { blogData.length === 0 && <h1 className = 'text-center'>No Blogs Found</h1>  }
            <div className="row">
                {blogData.length > 0 && blogData.map((val,i) => (
                    <div className="col-sm-4" key = {i}>
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title text-center">{val.title}</h5>
                                <div className='d-flex justify-content-center align-items-center mt-5'>
                                    <Avatar style={{ backgroundColor: '#f56a00', verticalAlign: 'middle' }} size="large">
                                        {(val.username).charAt(0).toUpperCase() }
                                    </Avatar>
                                    <h6 className='mb-0 ml-2'>{val.username}</h6>
                                </div>
                                <hr className='mt-5' />
                                <div className='d-flex justify-content-center'>
                                        <button type="button" className="btn btn-primary btn-sm d-flex align-items-center" onClick = {()=> history.push(`/blog-details/${val.id}`)}>Read More <RightOutlined className='ml-3 text-white' /></button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Blogs
