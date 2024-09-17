import React, { useContext, useEffect, useState } from 'react';
import User from '../imgs/user.jpg';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';
import { AuthContext } from '../context/authContext';
import Menu from '../components/Menu';
import LoadingSpinner from '../components/LoadingSpinner.jsx';

import "../style/style.scss";
import "../style/single-post.scss";


const SinglePost = () => {
  const [showScroll, setShowScroll] = useState(false);  // State for scroll button visibility
  const [post, setPost] = useState(null);  // Initialize as null for the post
  const [recommendedPosts, setRecommendedPosts] = useState([]);  // Initialize an empty array for recommended posts

  const location = useLocation();
  const postId = location.pathname.split('/')[3];  // Get post ID from the URL
  const { currUser } = useContext(AuthContext);
  const navigate = useNavigate();

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

  useEffect(() => {
    scrollToTop();
    const fetchPostAndRecommended = async () => {
      try {
        const res = await axios.get(`http://localhost:8800/api/posts/${postId}/with-recommendations`);
        setPost(res.data.post);  // Set the single post data
        setRecommendedPosts(res.data.recommendedPosts);  // Set the recommended posts
      } catch (error) {
        console.error('Error fetching post and recommended posts:', error);
      }
    }
    fetchPostAndRecommended();
  }, [postId]);

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8800/api/posts/${postId}`);
      navigate('/posts/home');
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  }

  // If the post data hasn't loaded yet, show the loading spinner
  if (!post) {
    return <LoadingSpinner />
  }

  return (
    <div className='singlePost'>
      <div className='content'>
      <img src={`/uploads/${post.cover_img}`} alt="" />
        <div className='info'>
          <div className='text-info'>
            <span><Link to="#">{post?.name} {post?.surname}</Link></span>
            <div className='post-info'>{post.date ? moment(post?.date).fromNow() : 'Once upon a time'}</div>
          </div>
          <div className="edit-links">
            {(currUser?.id === post?.user_id) && (
                <Link to={`/posts/write?edit=${postId}`} state={post}>
                  <button className='edit'>Edit Post</button>
                </Link>
            )}
            {(currUser?.role > 1000 || currUser?.id === post?.user_id) && (
              <button onClick={handleDelete} className='delete'>
                Delete Post
                </button>
            )}
              
                
          </div>
        </div>
        <div className="post-text">
          <h1>{post?.title}</h1>
          <div dangerouslySetInnerHTML={{ __html: post?.body }} /> {/* Safely render HTML */}
        </div>
      </div>
      <div className="menu">
        <Menu posts={recommendedPosts} />
      </div>
      {/* Scroll to Top Button */}
      {showScroll && (
        <button className="scroll-top-btn" onClick={scrollToTop}>
          ↑ Scroll to Top
        </button>
      )}
    </div>
  );
}

export default SinglePost;
