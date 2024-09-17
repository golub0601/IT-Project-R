import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/authContext'; 
import "../style/login_register.scss";

// Centralizing Axios credentials setup (if you haven't already)
axios.defaults.withCredentials = true;

const Login = () => {
  const [inputs, setInputs] = useState({
    email: "",
    password: ""
  });

  const { login } = useContext(AuthContext);
  const [err, setError] = useState(null);  // Fix: Use `err` directly
  const navigate = useNavigate();

  const handleChange = (e) => {
    setInputs(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(inputs);  // Attempt login
      navigate("/posts/home");  // Navigate after successful login
    } catch (e) {
      // Fix: Provide fallback in case `e.response` or `e.response.data` is undefined
      const message = e.response && e.response.data ? e.response.data : "Login failed. Please try again.";
      setError(message);
      console.error('Error in Login:', message);  // Add console logging for debugging
    }
  };

  return (
    <div className='auth'>
      <h1>LOGIN</h1>
      <form onSubmit={handleSubmit}>  {/* Fix: Move onSubmit to form */}
        <input
          required
          type="text"
          name="email"
          placeholder="Your email"
          value={inputs.email}
          onChange={handleChange}
        />
        <input
          required
          type="password"
          name="password"
          placeholder="Your password"
          value={inputs.password}
          onChange={handleChange}
        />
        <button type="submit">LOGIN</button>  {/* Ensure type is submit */}
        {err && <p className="error">{err}</p>}  {/* Display error if exists */}
        <span>
          Do not have an account? <Link to='/register'>Register</Link>
        </span>
      </form>
      <br />
      <span>
        Or just <Link to='/posts/home'>look around</Link>
      </span>
    </div>
  );
};

export default Login;
