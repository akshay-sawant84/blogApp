import React, { useEffect, useState } from 'react'
import { DeleteOutlined, EditOutlined, LeftOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom'
import {
    useParams
} from "react-router-dom";
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import moment from 'moment';
import { useHistory } from "react-router-dom";

const BlogDetails = () => {
    const [blogDetails, setblogDetails] = useState(null)
    let { id } = useParams();
    let history = useHistory();
    useEffect(() => {

        let dataToken;
        let token = localStorage.getItem('jwtToken');
        if (token) {
            dataToken = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        }


        axios.get(`http://localhost:5000/api/blog-details/${id}`, dataToken).then((res) => {
            if (res.status === 200) {
                setblogDetails(res.data.data)
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


    const _onDelete = (val) => {
        let token = localStorage.getItem('jwtToken');
        axios.delete(`http://localhost:5000/api/blog/delete/${val}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((res) => {
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
    }

    return (
        <div className='container my-5'>
            <h1 className='text-center'>Blog Details</h1>
            <hr />
            {blogDetails !== null && (
                <div className='row mt-5'>
                    <div className='col-md-8 offset-md-2'>
                        <h3 className='text-center'>{blogDetails.title}</h3>
                        <p style={{ fontSize: '18px' }} className='mt-5'>{blogDetails.description}</p>
                        <div className='mt-5'>
                            {/* <p>Posted by - Akshay Sawant</p> */}
                            <p>{moment(blogDetails.updatedAt).fromNow()}</p>
                        </div>

                        {blogDetails.showEditDelete === 1 && (
                            <div className='icons d-flex mb-3'>
                                <div>
                                    <EditOutlined className='text-dark' style={{ fontSize: '30px' }} onClick={() => history.push(`/blog/edit/${blogDetails.id}`)} />
                                </div>
                                <div className='ml-3'>
                                    <DeleteOutlined style={{ fontSize: '30px' }} onClick={() => _onDelete(blogDetails.id)} />
                                </div>
                            </div>
                        )}
                        <Link to='/'>
                            <button type="button" className="btn btn-primary btn-sm d-flex align-items-center"><LeftOutlined className='mr-3 text-white ' /> Go Back </button>
                        </Link>
                    </div>
                </div>
            )}
        </div>
    )
}

export default BlogDetails
