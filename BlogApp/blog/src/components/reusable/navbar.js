import React from 'react'
import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Navbar = () => {

    const auth = useSelector(state => state.auth)

    const _onLogout = () => {
        localStorage.clear()
        window.location.assign('/')
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-dark sticky-top bg-dark">
            <div className='container'>
                <NavLink to='/'>
                    <span className="navbar-brand">Blogger</span>
                </NavLink>
                <div className='d-flex'>
                    {auth.isAuthenticated && <button type="button" className="btn btn-outline-primary d-block d-md-none">{auth.user.username}</button>}
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                </div>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item active">
                            <NavLink to='/'>
                                <span className="nav-link text-white" >Home</span>
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to='/blog/add'>
                                <span className="nav-link text-white">Add Blog</span>
                            </NavLink>
                        </li>
                        {auth.isAuthenticated !== true && (
                            <>
                                <li className="nav-item">
                                    <NavLink to='/register'>
                                        <span className="nav-link text-white">Register</span>
                                    </NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink to='/login'>
                                        <span className="nav-link text-white">Login</span>
                                    </NavLink>
                                </li>
                            </>
                        )}
                        {
                            auth.isAuthenticated && (
                                <>
                                    <li className="nav-item" onClick={_onLogout}>
                                        <a className="nav-link text-white">Logout</a>
                                    </li>
                                    <li className="nav-item">
                                        {auth.isAuthenticated && <button type="button" className="btn btn-outline-primary">{auth.user.username}</button>}
                                    </li>
                                </>
                            )
                        }
                    </ul>
                </div>
            </div>
            <style>
                {
                    `
                    .nav-item a{
                        text-decoration: none;
                    }
                    `
                }
            </style>
        </nav>
    )
}

export default Navbar
