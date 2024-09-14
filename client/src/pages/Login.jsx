import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { AuthContext } from '../context/authContext';

import "../style/login_register.scss"


// In your frontend (Axios setup)
axios.defaults.withCredentials = true;

const Login = () => {
  const [inputs, setInputs] = useState({
    email: "email",
    password: "password"
  });

  const { login } = useContext(AuthContext)


  const handleChange = e => {
    setInputs(prev=>({...prev, [e.target.name]:e.target.value}))
  }

  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault()
    try{
      await login(inputs)
      // console.log(currUser);
      navigate("/posts/home");
    }
    catch(e) {
      setError(e.response.data)
      console.log('Error in login.jsx')
    }
  }


  const [err, setError] = useState(null);
  return (
    <div className='auth'>
        <h1>LOGIN</h1>
        <form action="">
            <input required type="text" name="email" placeholder="Your email" onChange = {handleChange} />
            <input required type="password" name="password" placeholder="Your password" id="" onChange = {handleChange} />
            <button onClick={handleSubmit}>LOGIN</button>
            <p>{err}</p>
            <span>Do not have account? <Link to='/register'>Register</Link></span>
        </form>
    </div>
  )
}

export default Login