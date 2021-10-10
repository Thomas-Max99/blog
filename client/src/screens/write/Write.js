import React from 'react';
import axios from 'axios';
import {BsPlusCircle} from 'react-icons/bs';
import {IconContext} from 'react-icons';
import './Write.css';
import {useState,useContext} from 'react';
import { Context } from '../../context/Context';
function Write() {
  const [file,setFile]=useState(null);
  const [title,setTitle]=useState("");
  const [desc,setDesc]=useState("");
  const {user}=useContext(Context);
  const handleSubmit= async (e)=>{
    e.preventDefault();
    const newPost={
      username:user.username,
      title,
      desc
    };
    if(file){
      const data=new FormData();
      const filename= Date.now() +file.name;
      data.append("name",filename);
      data.append("file",file);
      newPost.photo=filename;
      try{
        await axios.post('/upload',data)
      }catch(err){
        console.log(err);
      }
    }
    try{
      const res=await axios.post("/post",newPost);
      window.location.replace("/signlePost"+res.data.data.newPost._id);
    }catch(err){
      console.log(err);
    }
  }
    return (
      <div className="write">
        <div className="writeForm">
        <div className="blogImg">
          { 
          file && (
            <img src={URL.createObjectURL(file)} alt="blog"/>
          )
          }
           
        </div>
          <form action="/" method="post" onSubmit={handleSubmit}>
            <div className="selectContainer">
              <label htmlFor="fileInput" className="selectFile">
                <IconContext.Provider value={{ className: "plusCircle" }}>
                  <BsPlusCircle />
                </IconContext.Provider>
              </label>
              <input
                type="file"
                className="fileInput"
                id="fileInput"
                autofocus={true}
                onChange={e=>setFile(e.target.value)}
                style={{ display: "none" }}
              />
              <input type="text" className="inputTitle" placeholder="Title....." onChange={e=>setTitle(e.target.value)} autofocus={true} />
            </div>
            <div className="textarea-container">
              <textarea
                type="text"
                placeholder="Enter your description...."
                className="inputText"
                onChange={e=>setDesc(e.target.value)}
                autofocus={true}
              ></textarea>
            </div>
            <input type="submit" value="Submit" />
          </form>
        </div>
      </div>
    );
}

export default Write
