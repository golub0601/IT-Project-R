import React, { useEffect, useState } from 'react'
import {Link, useLocation} from 'react-router-dom'
import axios from 'axios'
import "../style/style.scss"
import "../style/home-style.scss"

const Home = () => {
  const [posts, setPosts] = useState([])

  const cat = useLocation().search;

  useEffect(()=>{
    const fetchPosts = async () =>{
      try {
        const res = await axios.get(`http://localhost:8800/api/posts${cat}`);
        setPosts(res.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchPosts();
  },[cat])

  return (

    <div className='home'>
      <div className="posts">
        {posts.map((post)=>(
          <div className='post' key={post.id}>
            <div className='post-img'>
              <img src={`../uploads/${post.cover_img}`} alt="" />
              <div className='bg-img'></div>
            </div>
            <div className='content'>
              <Link to={`/post/${post.id}`}>
                <h1>{post.title}</h1>
              </Link>
              <div dangerouslySetInnerHTML={{ __html: post?.body }} /> {/* Safely render HTML */}
              <Link to={`post/${post.id}`}>
                <button>Read more</button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Home