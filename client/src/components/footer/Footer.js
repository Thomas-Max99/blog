import React from 'react';
import { SocialIcon } from 'react-social-icons';
import './Footer.css';

function Footer() {
    return (
        <div className="footer">
            <div className="social-network">
                <SocialIcon network="twitter" style={{ height: 26, width: 26 }} url="https://twitter.com"/>
                <SocialIcon network="facebook" style={{ height: 26, width: 26 }} url="https://facebook.com"/>
                <SocialIcon network="instagram"  style={{height: 26, width: 26 }} url="https://instagram..com"/>
            </div>
        </div>
    )
}

export default Footer
