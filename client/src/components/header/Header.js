import React from 'react';
import Banner from '../../assets/images/banner.png';
import './Header.css';
const Header=()=>{
    return (
        <div className="header">
           <img src={Banner} alt="Blog banner"/>
           <p className="banner-link">Hi-Tech</p>
           <p className="banner-text">
                Certainty listening no behaviour existence
                assurance situation
           </p>
        </div>
    )
}

export default Header;