import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner.jsx'
import axios from 'axios';
import "../style/style.scss";
import "../style/home-style.scss";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);  // State to handle loading animation
  const [showScroll, setShowScroll] = useState(false);  // State for scroll button visibility
  const cat = useLocation().search;

  useEffect(() => {
    scrollToTop();
    const fetchPosts = async () => {
      try {
        const res = await axios.get(`http://localhost:8800/api/posts${cat}`);
        // Ensure the loading state remains for at least 1200ms
        setTimeout(() => {
          setPosts(res.data);
          setLoading(false);  // Stop loading after posts are fetched and delay is complete
        }, 1200);
      } catch (error) {
        console.log(error);
      }
    };
    
    fetchPosts();
  }, [cat]);

  // Handle Scroll Event`
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {  // Show button after scrolling 300px
        setShowScroll(true);
      } else {
        setShowScroll(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);  // Cleanup listener on component unmount
  }, []);

  // Scroll to Top Function with Smooth Scrolling
  const scrollToTop = () => {
    const scrollStep = -window.scrollY / 30;  // Divide scroll into steps
    const scrollInterval = setInterval(() => {
      if (window.scrollY !== 0) {
        window.scrollBy(0, scrollStep);  
      } else {
        clearInterval(scrollInterval);  
      }
    }, 25);  // Run every 25ms
  };

  return (
    <div className='home'>
      {loading ? (
        <LoadingSpinner/>
      ) : (
        <div className="posts">
          {posts.map((post) => (
            <div className='post' key={post.id}>
              <Link to={`http://localhost:5173/posts/post/${post.id}`}>
                <div className='post-img'>
                  <img src={`../uploads/${post.cover_img}`} alt="" />
                  <div className='bg-img'></div>
                </div>
              </Link>
              <div className='content'>
                <Link to={`http://localhost:5173/posts/post/${post.id}`}>
                  <h1>{post.title}</h1>
                </Link>
                <div dangerouslySetInnerHTML={{
                  __html: post?.body.length > 40
                    ? `${post.body.slice(0, 40)}...`
                    : post.body
                }}
                /> {/* Safely render HTML */}
                <Link to={`http://localhost:5173/posts/post/${post.id}`}>
                  <button>Read more</button>
                </Link>
                <hr className="bookend-hr" />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Scroll to Top Button */}
      {showScroll && (
        <button className="scroll-top-btn" onClick={scrollToTop}>
          ↑ Scroll to Top
        </button>
      )}
    </div>
  );
}

export default Home;
