import axios from 'axios'
import jwt_decode from 'jwt-decode'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const AUTH_ACTIION_TYPES = {
    ON_REGISTER_SUCCESS: "AUTH/ON_REGISTER_SUCCESS",
    ON_REGISTER_FAILURE: "AUTH/ON_REGISTER_FAILURE",
    ON_LOGIN_SUCCESS: "AUTH/ON_LOGIN_SUCCESS",
    ON_LOGIN_FAILURE: "AUTH/ON_LOGIN_FAILURE",
};

export const onRegisterSuccess = () => {
    return {
        type: AUTH_ACTIION_TYPES.ON_REGISTER_SUCCESS,
    };
};

export const onRegisterFailure = (msg) => {
    return {
        type: AUTH_ACTIION_TYPES.ON_REGISTER_FAILURE,
        payload: msg,
    };
};

export const onLoginSuccess = (user) => {
    return {
        type: AUTH_ACTIION_TYPES.ON_LOGIN_SUCCESS,
        payload: user,
    };
};

export const onLoginFailure = (msg) => {
    return {
        type: AUTH_ACTIION_TYPES.ON_LOGIN_FAILURE,
        payload: msg,
    };

};


export const onRegister = (data, history) => {
    return dispatch => {
        axios.post('http://localhost:5000/api/user/register', data).then(res => {
            if (res.status === 200) {
                dispatch(onRegisterSuccess())
                history.push('/login')
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
        }).catch(err => {
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
}


export const onLogin = (data, history) => {
    return dispatch => {
        axios.post('http://localhost:5000/api/user/login', data).then(res => {
            if (res.status === 200) {
                const { data } = res.data
                localStorage.setItem('jwtToken', data)
                const decoded = jwt_decode(data)
                dispatch(onLoginSuccess(decoded))
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
}

