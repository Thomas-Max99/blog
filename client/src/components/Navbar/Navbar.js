import React,{useState,useContext} from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import {FiMenu,FiX} from 'react-icons/fi';
import {Context} from '../../context/Context';
function Navbar() {
    const [open,setOpen] =useState(false);
    const {user,dispatch}=useContext(Context);
    const handleLogout=()=>{
        dispatch({type:"LOGOUT"})
    }
    return (
        <nav className="navbar">
            <div onClick={()=>setOpen(!open)} className="nav-icon">
                {open ? <FiX/> : <FiMenu/>}
            </div>
            <Link to="/" className="navbar-logo">
                BlogO
            </Link>
            <ul className={open ? 'nav-links active' : 'nav-links'}>
                <li className="nav-items">
                    <Link to="/write" className="nav-link" onClick={()=>setOpen(false)}>
                        Write
                    </Link>
                </li>
                <li className="nav-items">
                    <Link to="/logout" className="nav-link" onClick={()=>
                        setOpen(false)} onClick={handleLogout}>  
                        Logout
                    </Link>
                </li>
            </ul>
            <Link to="/signup" className="nav-sign" onClick={()=>setOpen(false)}>
                Log In
            </Link>
        </nav>
    )
}

export default   Navbar;
