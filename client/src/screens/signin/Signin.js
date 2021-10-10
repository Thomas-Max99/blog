import React,{ useRef,useContext } from 'react';
import { Context } from '../../context/Context';
import axios from 'axios';

const Signin= () =>{
  const emailRef=useRef();
  const passwordRef=useRef();
  const { dispatch,isFetching } =useContext(Context);
  const handleSubmit =async (e)=>{
    e.preventDefault();
    dispatch({type: "LOGIN_START"});
    try{
      const res=await axios.post("/auth/signin",
      { 
        email: emailRef.current.value,
        password: passwordRef.current.value
      });
      dispatch({type:"LOGIN_SUCCESS",payload:res.data})
    }catch(err){
      dispatch({type:"LOGIN_FAILURE"})
    }
  }

    return(
        <div className="container">
      <form method="POST" id="form" onSubmit={handleSubmit}>
        <div className="text">
          <h2>Sign in to your  account</h2>
        </div>
        <div className="input-container">
          <input type="email" placeholder="Email" name="email" required 
            ref={emailRef}
          />
        </div>
        <div className="input-container">
          <input
            type="password"
            placeholder="Password"
            name="password"
            ref={passwordRef}
            required
          />
        </div>
        <input type="submit" value="Log In" disabled={isFetching} />
      </form>
    </div>
    )
}

export default Signin;