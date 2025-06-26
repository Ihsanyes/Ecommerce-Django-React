import React, { useEffect, useState } from 'react'
import './Navbar.css'
import { Link, useNavigate } from 'react-router-dom';
import { isAuthenticated, logout } from '../auth/auth';
// import { getAccessToken } from '../auth/auth';
import axiosInstance from '../auth/Axios_instance';
// import axios from 'axios';
import { API_URL } from '../../Api_urls';
// import ProfileInfo, { ProfileContext } from '../settings/Settings';



function Navbar() {
    const navigate = useNavigate();
    const handleLogout = () => {
        logout();
        navigate('/login'); // Redirect to login page after logout
    }
    const [isOpen, setIsOpen] = useState(false);
    const [user, setUser] = useState()




    // <ProfileContext.Provider>
    //     <ProfileContext.Provider/>
    //   return (

    //   );







    const userFetch = async () => {
        try {

            const response = await axiosInstance.get(`current_user/`)
            // console.log(response.data)
            setUser(response.data)
        } catch (error) {
            console.log('Error fetching user data:', error);
        }
    }
    useEffect(() => {
        userFetch()
    }, [])

    return (
        <div className="nav-body">
            <div className="nav-bar">
                <div className="menu-header">
                    <Link to='/' className="couture-head">couture</Link>
                    <div className="menu-lg">
                        <Link to='/about' className='menu-items'>About</Link>
                        {isAuthenticated() ? (
                            <Link to='#' className='menu-items' onClick={handleLogout}>Logout</Link>
                        ) : (
                            <>
                                <Link to='/already-login' className='menu-items'>Login</Link>
                                <Link to='/login' className='menu-items'>Sign Up</Link>
                            </>
                        )}


                    </div>

                    <div className={`menu-icon ${isOpen ? 'open' : ''}`} onClick={() => setIsOpen(!isOpen)}>
                        <span></span>
                        <span></span>
                        <span></span>
                        {/* Dropdown Menu */}
                        {isOpen && (
                            <div className="dropdown-menu">
                                <ul>
                                    {/* <li><Link to='/'>Home</Link></li>
                                <li><Link to='#'>Men</Link></li>
                                <li><Link to='#'>Women</Link></li>
                                <li><Link to='#'>Sports</Link></li>
                                <li><Link to='#'>Kids</Link></li> */}
                                    {/* <li><hr className='dropdown-divider' /></li> */}
                                    {isAuthenticated() ? (
                                        <li><Link to='#' onClick={handleLogout}>Logout</Link></li>
                                    ) : (
                                        <>
                                            <li><Link to='/already-login'>Login</Link></li>
                                            <li><Link to='/login'>Sign Up</Link></li>
                                        </>
                                    )}
                                    {/* <li><Link to='#'>Login</Link></li>
                                <li><Link to='#'>Logout</Link></li> */}
                                    <li><Link to="/about">About</Link></li>
                                    <li><Link to="/settings">Settings</Link></li>
                                </ul>
                            </div>
                        )}
                    </div>

                </div>
                <div className="nav-search">
                    <input type="text" className="input-search" placeholder="search" />
                    <div className="user-setting">
                        <Link to={isAuthenticated() ? '/settings' : '/login'}>
                            <span className="user-name">
                                {/* if( user ){user.email} */}
                                {/* {user ? user.name.length > 8 ? user.name.slice(0,8): user.email : 'Guest'} */}
                                {user ?
                                    user.name ?
                                        user.name.length > 8 ?
                                            user.name.slice(0, 8)
                                            : user.name
                                        : user.email ?
                                            user.email.slice(0, 8)
                                            : user.email
                                    : 'Guest'}
                            </span>
                            <img
                                className="user-setting-img"
                                src="1713110693957.jpg"
                                alt="User"
                            />
                        </Link>
                    </div>

                </div>
                <div className="nav-line"></div>
            </div><br />
        </div>
    )
}

export default Navbar
