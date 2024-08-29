import React from 'react'
import {Link} from 'react-router-dom'
import "../style/style.scss"
import "../style/menu.scss"



function Menu() {
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
    <div className='menu-container'>
        <h1>Other posts that you may like:</h1>
        {posts.map(post=>(
            <div className='post-view-menu' key={post.id}>
                <img src={post.img} alt="" />
                <h2>{post.title}</h2>
                <button className='read-post-btn'>Read more</button>
            </div>
        ))}
    </div>
  )
}

export default Menu