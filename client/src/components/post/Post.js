import React from 'react';
import './Post.css';
import { Link } from 'react-router-dom'
function Post({post}) {
    return (
        <div className="post">
            {
                post.photo && (
                    <img src={post.photo} className="post-image" alt="Post"/>
                )
            }
          
            <div className="postInfo">
                <div className="post-category">
                  {
                      post.categories.map(c=>(
                          <span className="post-category">{c.name}</span>
                      ))
                  }
                </div>
                <Link to={`/post/${post._id}`} className="link">
                    <p className="post-title">
                    {post.title}
                    </p>
                </Link>
                <p className="post-date">{new Date(post.createdAt).toDateString()}</p>
                <p className="post-desc">
               {post.description}
                </p>
            </div>
        </div>
    )
}

export default Post
