import React from 'react';
import './SinglePost.css';
import { FaRegEdit } from 'react-icons/fa';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { IconContext } from 'react-icons';
import { useLocation } from 'react-router';
import { useEffect,useState,useContext} from 'react';
import axios from 'axios';
import { Context } from '../../context/Context';
function SinglePost() {
    const location= useLocation();
    const path=location.pathname.split("/")[2];
    const [post,setPost]=useState({});
    const {user}=useContext(Context);
    const [title,setTitle]=useState("");
    const [desc,setDesc]=useState("");
    const [updateMode,setUpdateMode]=useState(false);
   useEffect(()=>{
            const getPost= async ()=>{
                const res=await axios.get("/post/"+path);
                setPost(res.data.data.post);
                setTitle(res.data.data.post.title);
                setDesc(res.data.data.post.description)
                console.log(res.data.data.post);
            }
            getPost();
   },[path]);
   const handleDelete=async ()=>{
       try{
        await axios.delete(`/post/${post._id}`+path);
        window.location.replace("/");
       }catch(err){
           console.log(err);
       }
   }
    return (
        <div className="singlepost">
            <div className="singlePostWrapper">
                {
                    post.photo && <img src={post.photo} alt="single post" className="singlepostImage"/>
                }{
                    updateMode ? <input type="text" value={post.title}/> :
                    <div className="prepostInfoTitle">
                    <h3 className="postTitle">{post.title}</h3>
                    { 
                        post.username=== user.username && 
                        <div className="editContainer">
                        <IconContext.Provider value={{ className:"edit" }}>
                            <FaRegEdit onClick={()=>setUpdateMode(true)}/>
                        </IconContext.Provider>
                        <IconContext.Provider value={{ className:"delete" }}>
                            <RiDeleteBin6Line onClick={handleDelete} />
                        </IconContext.Provider>
                    </div>
                    }
                    
                </div>
                }
               
                <p className="authorInfo">Author: <span>Mcmillan</span></p>
                <p className="postDate">{new Date(post.createdAt).toDateString()}</p>
                {
                    updateMode ? <textarea type="text" value={desc} onChange={(e)=>setDesc(e.target.value)}className="updateTextarea"/> :  <div className="postDescription">
                    {post.description}
                    </div>
                }
               
            </div>
        </div>
    )
}

export default SinglePost
