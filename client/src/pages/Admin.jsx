import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import '../style/admin.scss';

const Admin = () => {
  // State to track which tab (Posts or Users) is active
  const [activeTab, setActiveTab] = useState('posts'); // default is 'posts'

  // Mock data for Posts and Users (replace with real data as necessary)
  const postsData = [
    { id: 1, title: 'Post 1', author: 'User A', date: '2024-01-01' },
    { id: 2, title: 'Post 2', author: 'User B', date: '2024-01-05' },
    { id: 3, title: 'Post 3', author: 'User C', date: '2024-01-10' },
  ];

  const usersData = [
    { id: 1, name: 'User A', email: 'usera@example.com', role: 'Admin' },
    { id: 2, name: 'User B', email: 'userb@example.com', role: 'User' },
    { id: 3, name: 'User C', email: 'userc@example.com', role: 'User' },
  ];

  return (
    <div>
      <Navbar />
      <div className='admin-container'>
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
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {postsData.map((post) => (
                    <tr key={post.id}>
                      <td>{post.id}</td>
                      <td>{post.title}</td>
                      <td>{post.author}</td>
                      <td>{post.date}</td>
                      <td>
                        <button>Edit</button>
                        <button>Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
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
                  {usersData.map((user) => (
                    <tr key={user.id}>
                      <td>{user.id}</td>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>{user.role}</td>
                      <td>
                        <button>Edit</button>
                        <button>Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Admin;
