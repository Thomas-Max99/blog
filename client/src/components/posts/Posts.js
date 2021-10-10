import React from 'react';
import './Posts.css';
import Post from '../post/Post.js';
function Posts({posts}) {
    return (
        <div className="post-container">
         {
              posts.map((p)=>(
                <Post post={p} />
            ))
          
         }  
                
        </div>
    )
}

export default Posts
