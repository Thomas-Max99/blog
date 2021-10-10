import React from 'react';
import './Single.css';
import Sidebar from '../../components/sidebar/Sidebar';
import SinglePost from '../../components/singlePost/SinglePost';
import Footer from '../../components/footer/Footer';

function Single() {
    return (
        <>
        <div className="single">
            <SinglePost/>
            <Sidebar/>
        </div>
        <Footer/>
        </>
    )
}

export default Single
