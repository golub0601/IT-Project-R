import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import '../style/admin.scss';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

const Admin = () => {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);
  const [showScroll, setShowScroll] = useState(false);
  const [activeTab, setActiveTab] = useState('users');
  const [postSearch, setPostSearch] = useState('');
  const [userSearch, setUserSearch] = useState('');
  const navigate = useNavigate();
  const cat = useLocation().search;

  const navigateToPost = (postId) => {
    navigate(`../posts/post/${postId}`);
  };

  const handleDeletePost = async (postId) => {
    try {
      await axios.delete(`http://localhost:8800/api/posts/${postId}`);
      setPosts(posts.filter(post => post.id !== postId));
      alert('Post deleted successfully!');
    } catch (error) {
      console.error('Error deleting post:', error);
      alert('Failed to delete post');
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setShowScroll(true);
      } else {
        setShowScroll(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    const scrollStep = -window.scrollY / 30;
    const scrollInterval = setInterval(() => {
      if (window.scrollY !== 0) {
        window.scrollBy(0, scrollStep);
      } else {
        clearInterval(scrollInterval);
      }
    }, 25);
  };

  useEffect(() => {
    scrollToTop();
    const fetchPosts = async () => {
      try {
        const queryParams = `${cat ? cat : ''}${cat ? '&' : '?'}page=${page}&limit=10`;
        const res = await axios.get(`http://localhost:8800/api/posts${queryParams}`);
        setPosts(res.data.posts);
        setTotalPages(res.data.totalPages);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    const fetchUsers = async () => {
      try {
        const res = await axios.get(`http://localhost:8800/api/users`);
        setUsers(res.data.users);
        setTotalPages(res.data.totalPages);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    const fetchRoles = async () => {
      try {
        const res = await axios.get(`http://localhost:8800/api/roles`);
        setRoles(res.data.roles);
      } catch (error) {
        console.error('Error fetching roles:', error);
      }
    };

    if (activeTab === 'posts') {
      fetchPosts();
    } else if (activeTab === 'users') {
      fetchUsers();
      fetchRoles();
    }
  }, [page, activeTab, cat]);

  useEffect(() => {
    if (activeTab === 'posts') {
      setFilteredPosts(posts.filter(post =>
        post.title.toLowerCase().includes(postSearch.toLowerCase()) ||
        post.author?.toLowerCase().includes(postSearch.toLowerCase())
      ));
    } else if (activeTab === 'users') {
      setFilteredUsers(users.filter(user =>
        user.name.toLowerCase().includes(userSearch.toLowerCase()) ||
        user.surname?.toLowerCase().includes(userSearch.toLowerCase()) ||
        user.email.toLowerCase().includes(userSearch.toLowerCase())
      ));
    }
  }, [posts, users, postSearch, userSearch, activeTab]);

  const handleRoleChange = (userId, newRole) => {
    setUsers(prevUsers =>
      prevUsers.map(user => (user.id === userId ? { ...user, role: newRole } : user))
    );
  };

  const handleSaveRole = async (userId, role) => {
    try {
      await axios.put(`http://localhost:8800/api/users/${userId}/role`, { role });
      alert('Role updated successfully!');
    } catch (error) {
      console.error('Error updating user role:', error);
      alert('Failed to update role');
    }
  };

  const handlePrevPage = () => {
    scrollToTop();
    if (page > 1) setPage(page - 1);
  };

  const handleNextPage = () => {
    scrollToTop();
    if (page < totalPages) setPage(page + 1);
  };

  return (
    <div>
      <Navbar />
      <div className="admin-container">
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

        <div className="tab-content">
          {activeTab === 'posts' && (
            <div className="posts-table">
              <h2>Posts Management</h2>
              <div className="pagination-controls">
              <input
                type="text"
                placeholder="Search posts..."
                value={postSearch}
                onChange={(e) => setPostSearch(e.target.value)}
              />
                <button onClick={handlePrevPage} disabled={page === 1}>
                  &lt; Previous
                </button>
                <span>
                  {page} of {totalPages}
                </span>
                <button onClick={handleNextPage} disabled={page === totalPages}>
                  Next &gt;
                </button>
              </div>
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
                  {filteredPosts.length > 0 ? (
                    filteredPosts.map((post) => (
                      <tr key={post.id} onClick={() => navigateToPost(post.id)}>
                        <td>{post.id}</td>
                        <td>{post.title}</td>
                        <td>{post.name} {post.surname}</td>
                        <td>{new Date(post.date).toLocaleDateString()}</td>
                        <td>
                          {post.cover_img ? (
                            <img
                              src={`../uploads/${post.cover_img}`}
                              alt={post.title}
                              style={{ width: '80px', height: '60px', objectFit: 'cover' }}
                            />
                          ) : (
                            <span>No Image</span>
                          )}
                        </td>
                        <td>
                          <button
                            className="delete-btn"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeletePost(post.id);
                            }}
                          >
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
            </div>
          )}
          {activeTab === 'users' && (
            <div className="users-table">
              <h2>Users Management</h2>
              <div className="pagination-controls">
                <input
                  type="text"
                  placeholder="Search users..."
                  value={userSearch}
                  onChange={(e) => setUserSearch(e.target.value)}
                />
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
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Surname</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.length > 0 ? (
                    filteredUsers.map((user) => (
                      <tr key={user.id}>
                        <td>{user.id}</td>
                        <td>{user.name}</td>
                        <td>{user.surname}</td>
                        <td>{user.email}</td>
                        <td>
                          <select
                            value={user.role}
                            onChange={(e) => handleRoleChange(user.id, e.target.value)}
                          >
                            {roles.map((role) => (
                              <option key={role.role_id} value={role.role_name}>
                                {role.role_name}
                              </option>
                            ))}
                          </select>
                        </td>
                        <td>
                          <button
                            className="save-btn"
                            onClick={() => handleSaveRole(user.id, user.role)}
                          >
                            Save
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6">No users available</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
      {showScroll && (
        <button className="scroll-top-btn" onClick={scrollToTop}>
          ↑ Scroll to Top
        </button>
      )}
    </div>
  );
};

export default Admin;
