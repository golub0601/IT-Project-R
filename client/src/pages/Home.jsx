import React from 'react'
import {Link} from 'react-router-dom'
import "../style/style.scss"
import "../style/home-style.scss"

const Home = () => {
    const posts = [
      {
        id: 1,
        title : "Amet consectetur adiam repelsa",
        desc : "Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci, saepe?",
        img: 'https://images.unsplash.com/photo-1496449903678-68ddcb189a24?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
      },
      {
        id: 2,
        title : "Amet consectetur adiam repelsa",
        desc : "Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci, saepe?",
        img: 'https://images.unsplash.com/photo-1496449903678-68ddcb189a24?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
      },
      {
        id: 3,
        title : "Amet consectetur adiam repelsa",
        desc : "Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci, saepe?",
        img: 'https://images.unsplash.com/photo-1496449903678-68ddcb189a24?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
      },
      {
        id: 4,
        title : "Amet consectetur adiam repelsa",
        desc : "Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci, saepe?",
        img: 'https://images.unsplash.com/photo-1496449903678-68ddcb189a24?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
      },
      {
        id: 5,
        title : "Amet consectetur adiam repelsa",
        desc : "Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci, saepe?",
        img: 'https://images.unsplash.com/photo-1496449903678-68ddcb189a24?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
      },
      {
        id: 6,
        title : "Amet consectetur adiam repelsa",
        desc : "Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci, saepe?",
        img: 'https://images.unsplash.com/photo-1496449903678-68ddcb189a24?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
      },
      {
        id: 7,
        title : "Amet consectetur adiam repelsa",
        desc : "Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci, saepe?",
        img: 'https://images.unsplash.com/photo-1496449903678-68ddcb189a24?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
      }
    ]
  return (

    <div className='home'>
      <div className="posts">
        {posts.map((post)=>(
          <div className='post' key={post.id}>
            <div className='post-img'>
              <img src={post.img} alt="" />
              <div className='bg-img'></div>
            </div>
            <div className='content'>
              <Link to={`/post/${post.id}`}>
                <h1>{post.title}</h1>
              </Link>
              <p>{post.desc}</p>
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