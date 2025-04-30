import React,{useState} from 'react'
import './Navbar.css'
import { Link, useNavigate } from 'react-router-dom';
import { isAuthenticated, logout } from '../auth/auth';


function Navbar() {
    const navigate = useNavigate();
    const handleLogout = () => {
        logout();
        navigate('/login'); // Redirect to login page after logout
    }
    const[isOpen, setIsOpen] = useState(false);
  return (
    <div className="nav-body">
        <div className="nav-bar">
            <div className="menu-header">
                <Link href='#' className="couture-head">couture</Link>
                <div className="menu-lg">
                    {/* <Link to='#'className='menu-items'>Men</Link>
                    <Link to='#'className='menu-items'>Women</Link> */}
                        <Link to='#'className='menu-items'>About</Link>
                    {isAuthenticated() ? (
                        <Link to='#' className='menu-items' onClick={handleLogout}>Logout</Link>
                    ) : (
                        <Link to='/login' className='menu-items'>Login</Link>
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
                                <li><Link to='/'>Home</Link></li>
                                <li><Link to='#'>Men</Link></li>
                                <li><Link to='#'>Women</Link></li>
                                <li><Link to='#'>Sports</Link></li>
                                <li><Link to='#'>Kids</Link></li>
                                <li><hr className='dropdown-divider' /></li>
                                {isAuthenticated() ? (
                                    <li><Link to='#' onClick={handleLogout}>Logout</Link></li>
                                ) : (
                                    <li><Link to='/login'>Login</Link></li>
                                )}
                                {/* <li><Link to='#'>Login</Link></li>
                                <li><Link to='#'>Logout</Link></li> */}
                                <li><a href="#">Settings</a></li>
                            </ul>
                        </div>
                    )}
                </div>
                
            </div>
            <div className="nav-search">
                <input type="text" className="input-search" placeholder="search" />
                <div className="user-setting">
                    <a href="#">
                        <span className="user-name">John Doe</span>
                        {/* <i className="fas fa-user-circle"> */}
                            <img className='user-setting-img' src="src\assets\1713110693957.jpg" alt="" />
                        {/* </i> */}
                    </a>
                </div>
                
            </div>
        <div className="nav-line"></div>
        </div><br />
    </div>
  )
}

export default Navbar
