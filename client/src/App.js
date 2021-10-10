import React,{useContext} from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Home from "./screens/home/Home";
import Signin from "./screens/signin/Signin";
import Signup from "./screens/signup/Signup";
import Single from "./screens/single/Single";
import Write from "./screens/write/Write";
import SinglePost from "./components/singlePost/SinglePost";
import {Context} from "./context/Context";
function App() {
  const {user}=useContext(Context)
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route path="/home" component={Home} exact>
          {user? <Home/> : <Signup/> }  
        </Route>
        <Route path="/signin" component={Signin} exact>
          {user ? <Home/> : <Signin/>}
        </Route>
        <Route path="/signup" component={Signup} exact >
          { user ? <Home/> : <Signup/> }
        </Route>
        <Route path="/singlepost" component={Single} exact>
          { user ? <SinglePost/> : <Signup/> }
        </Route>
        <Route path="/write" component={Write} exact>
          { user ? <Write/> : <Signup/>}
        </Route>
        <Route path="/post/:postId" component={SinglePost} exact>
          { user ? <SinglePost/> : <Signup/> }  
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
