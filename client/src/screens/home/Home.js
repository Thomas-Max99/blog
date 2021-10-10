import React, { useState,useEffect } from 'react';
import Sidebar from '../../components/sidebar/Sidebar';
import Posts from '../../components/posts/Posts'; 
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';
import './Home.css';
import axios from 'axios';
const Home = () =>{
    const [posts,setPosts]=useState([]);
    useEffect(()=>{
            const fetchPosts= async ()=>{
                try{
                    const res= await axios.get("/post");
                    console.log(res);
                    setPosts(res.data.data.posts);
                }catch(error){
                    console.log(error);
                }
               
            }
        fetchPosts();
    },[]);
    

    return(
        <>
        <Header/>s
        <div className="home">
             <Posts posts={posts} /> 
            <Sidebar/>
        </div>
        <Footer/>
        </>
    )
}

export default Home;