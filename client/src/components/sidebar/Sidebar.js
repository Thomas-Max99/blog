import React from 'react';
import './Sidebar.css';
import postImage from '../../assets/images/imageblog1.png';
import picImage from '../../assets/images/imageblog2.png';
import {useEffect,useState } from 'react';
import axios from 'axios';
const Sidebar = () => {
    const [cats,setCats]=useState([]);
    useEffect(()=>{
        const getCats= async () =>{
            const res=await axios.get("/categorie/");
            setCats(res.data.data.categories);
        }
        getCats();
    })
    return (
        <div className="sidebar">
            <div className="sidebar-items">
                <h3>Popular Posts</h3>
                <div className="popular-post">
                    <img src={postImage} alt="post" className="postImage"/>
                    <p className="post-text">Certainty listening no behavior existence assurance situation</p>
                </div>
                <div className="popular-post">
                    <img src={postImage} alt="post" className="postImage"/>
                    <p className="post-text">Certainty listening no behavior existence assurance situation</p>
                </div>
                <div className="popular-post">
                    <img src={postImage} alt="Post" className="postImage"/>
                    <p className="post-text">Certainty listening no behavior existence assurance situation</p>
                </div>
                <div className="popular-post">
                    <img src={postImage} alt="post" className="postImage"/>
                    <p className="post-text">Certainty listening no behavior existence assurance situation</p>
                </div>
            </div>
             <div className="sidebar-items">
                 <h3>Our Pic</h3>
               <div className="pic-container">
                 <div className="imageContainer">
                      <p className="category-pic">Lifestyle</p>
                    <img src={picImage} alt="pic" className="picImage"/>
                 </div>
                 <p className="pic-text">Certainty listening no behavior existence assurance
                    situation</p>
                </div> 
                <div className="pic-container">
                 <div className="imageContainer">
                      <p className="category-pic">Lifestyle</p>
                    <img src={picImage} alt="pic" className="picImage"/>
                 </div>
                 <p className="pic-text">Certainty listening no behavior existence assurance
                    situation</p>
                </div> 
            </div>
            <div className="sidebar-items">
                <h3>Categories</h3>
            <div className="all-categories">
                {
                    cats.map(c=>(
                        <p>{cats.name} (<span className="num-post">12</span>)</p>
                    ))
                }
            </div>
            </div>
        </div>
    );
}

export default Sidebar;
