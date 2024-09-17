import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import '../style/admin.scss';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

const Admin = () => {
  const [posts, setPosts] = useState([]); // Dynamically fetched posts
  const [users, setUsers] = useState([]); // Dynamically fetched users
  const [totalPages, setTotalPages] = useState(1); // To manage pagination
  const [page, setPage] = useState(1); // Current page state
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('users');
  const cat = useLocation().search; // Get category from URL search params

  const navigateToPost = (postId) => {
    navigate(`../posts/post/${postId}`); // Correct navigation for the posts
  };

  // Fetch posts and users based on the active tab and current page
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const queryParams = `${cat ? cat : ''}${cat ? '&' : '?'}page=${page}&limit=10`;
        const res = await axios.get(`http://localhost:8800/api/posts${queryParams}`);

        setPosts(res.data.posts); // Set posts from API
        setTotalPages(res.data.totalPages); // Set total pages from API
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    const fetchUsers = async () => {
      try {
        const res = await axios.get(`http://localhost:8800/api/users`);

        setUsers(res.data.users); // Set users from API
        setTotalPages(res.data.totalPages); // Set total pages from API (if pagination is enabled)
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    if (activeTab === 'posts') {
      fetchPosts();
    } else if (activeTab === 'users') {
      fetchUsers();
    }
  }, [page, activeTab, cat]);

  // Delete Post Handler
  const handleDeletePost = async (postId) => {
    try {
      await axios.delete(`http://localhost:8800/api/posts/${postId}`); // Make the DELETE request

      // Remove the deleted post from the state to update the UI
      setPosts(posts.filter(post => post.id !== postId));
      alert('Post deleted successfully!');
    } catch (error) {
      console.error('Error deleting post:', error);
      alert('Failed to delete post');
    }
  };

  // Pagination controls
  const handlePrevPage = () => {
    if (page > 1) setPage(page - 1);
  };

  const handleNextPage = () => {
    if (page < totalPages) setPage(page + 1);
  };

  return (
    <div>
      <Navbar />
      <div className="admin-container">
        <h1>Admin Page</h1>

        {/* Tab Controls */}
        <div className="tabs">
          <button
            className={`tab ${activeTab === 'posts' ? 'active' : ''}`}
            onClick={() => setActiveTab('posts')}
          >
            Manage Posts
          </button>
          <button
            className={`tab ${activeTab === 'users' ? 'active' : ''}`}
            onClick={() => setActiveTab('users')}
          >
            Manage Users
          </button>
        </div>

        {/* Conditional rendering based on activeTab */}
        <div className="tab-content">
          {activeTab === 'posts' && (
            <div className="posts-table">
              <h2>Posts Management</h2>
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Title</th>
                    <th>Author</th>
                    <th>Date</th>
                    <th>Cover</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {posts.length > 0 ? (
                    posts.map((post) => (
                      <tr key={post.id} onClick={() => navigateToPost(post.id)}>
                        <td>{post.id}</td>
                        <td>{post.title}</td>
                        <td>author</td>
                        <td>{new Date(post.date).toLocaleDateString()}</td>
                        <td>
                          {post.cover_img ? (
                            <img
                              src={`../uploads/${post.cover_img}`}
                              alt={post.title}
                              style={{ width: '80px', height: '60px', objectFit: 'cover' }} // Styling for image
                            />
                          ) : (
                            <span>No Image</span>
                          )}
                        </td>
                        <td>
                          <button className="delete-btn" onClick={(e) => {
                            e.stopPropagation(); // Prevent triggering row click event
                            handleDeletePost(post.id);
                          }}>
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6">No posts available</td>
                    </tr>
                  )}
                </tbody>
              </table>

              {/* Pagination Controls */}
              <div className="pagination-controls">
                <button onClick={handlePrevPage} disabled={page === 1}>
                  Previous
                </button>
                <span>
                  Page {page} of {totalPages}
                </span>
                <button onClick={handleNextPage} disabled={page === totalPages}>
                  Next
                </button>
              </div>
            </div>
          )}

          {activeTab === 'users' && (
            <div className="users-table">
              <h2>Users Management</h2>
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.length > 0 ? (
                    users.map((user) => (
                      <tr key={user.id}>
                        <td>{user.id}</td>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>{user.role}</td>
                        <td>
                          <button className="delete-btn">Disable user</button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5">No users available</td>
                    </tr>
                  )}
                </tbody>
              </table>

              {/* Pagination Controls for Users (if needed) */}
              <div className="pagination-controls">
                <button onClick={handlePrevPage} disabled={page === 1}>
                  Previous
                </button>
                <span>
                  Page {page} of {totalPages}
                </span>
                <button onClick={handleNextPage} disabled={page === totalPages}>
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Admin;
