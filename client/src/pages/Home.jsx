import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner.jsx'
import axios from 'axios';
import "../style/style.scss";
import "../style/home-style.scss";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showScroll, setShowScroll] = useState(false);
  const [page, setPage] = useState(1); // State to manage the current page
  const [totalPages, setTotalPages] = useState(1); // State to store total pages
  const cat = useLocation().search;

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
    const fetchPosts = async () => {
      try {
        // Properly construct the API URL
        const queryParams = `${cat ? cat : ''}${cat ? '&' : '?'}page=${page}&limit=6`;
        const res = await axios.get(`http://localhost:8800/api/posts${queryParams}`);  // Constructed URL with proper query params
        
        setTimeout(() => {
          setPosts(res.data.posts);  // Update with fetched posts
          setTotalPages(res.data.totalPages);  // Update total pages
          setLoading(false);
        }, 1200);
      } catch (error) {
        console.log(error);
      }
    };
    fetchPosts();
  }, [cat, page]);

  useEffect(()=>{
    setPage(1);
  }, [cat])

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  const jumpToPage = () => {
    setPage(page);
  }

  const handlePrevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  // Scroll to Top and handle scrolling event remains the same
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
        <LoadingSpinner />
      ) : (
        <div>
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
                  }} />
                  <Link to={`http://localhost:5173/posts/post/${post.id}`}>
                    <button>Read more</button>
                  </Link>
                  <hr className="bookend-hr" />
                </div>
              </div>
            ))}
          </div>
          {/* Pagination Buttons */}
          <br />
          <div className='pagination-container'>
            <div className="pagination">
              <button 
                onClick={handlePrevPage} 
                disabled={page === 1}
                className={`pagination-btn ${page === 1 ? 'disabled' : ''}`}
              >
                &#8592; Previous
              </button>
              <span className="pagination-info">
                Page {page} of {totalPages}
              </span>

                <div className="progress-bar">
                  <div 
                    className="progress" 
                    style={{ width: `${(page / totalPages) * 100}%` }}
                  />
                </div>

                <button 
                  onClick={handleNextPage} 
                  disabled={page === totalPages} 
                  className={`pagination-btn ${page === totalPages ? 'disabled' : ''}`}
                >
                  Next &#8594;
                </button>
              </div>
            </div>
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
