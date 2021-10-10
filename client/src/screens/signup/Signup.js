import React from "react";
import "./Signup.module.css";
import { useState,useEffect } from 'react';
import axios from 'axios';

const Signup = () => {
  const [username,setUsername]=useState("");
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const [confirmPassword,setConfirmPassword]=useState("");
  const [error,setError]=useState(false);
  const handleSubmit= async (e)=>{
    e.preventDefault();
    setError(false)
    try{
      const res=await axios.post("/auth/signup",{username,email,password,confirmPassword});
      res.data.data.newUser && window.location.replace("/signin")
      console.log(res);
    }catch(err){
      setError(true)
    }
  }
  return (
    <div className="container">
      <form method="POST" id="form" onSubmit={handleSubmit}>
        <div className="text">
          <h2>Create an account</h2>
        </div>
        <div className="input-container">
          <input type="text" placeholder="Username" name="username" onChange={e=>setUsername(e.target.value)} required />
        </div>
        <div className="input-container">
          <input type="email" placeholder="Email" name="email" onChange={e=>setEmail(e.target.value)} required />
        </div>
        <div className="input-container">
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={e=>setPassword(e.target.value)}
            required
          />
        </div>
        <div className="input-container">
          <input
            type="password"
            placeholder="Confirm your Password"
            name="confirmPassword"
            onChange={e=>setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <input type="submit" value="Sign Up" />
        {
          error && <span style={{color: "red",marginTop:"20px"}}>Something went wrong</span>
        }  
      </form>
    </div>
  );
};

export default Signup;
