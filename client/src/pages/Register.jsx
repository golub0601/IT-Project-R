import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import "../style/style.scss"
import "../style/login_register.scss"

const Register = () => {
  const [inputs, setInputs] = useState ({
    name : '',
    email : '',
    surname: '',
    password : ''
  })

  const navigate = useNavigate();

  const [err, setError] = useState(null)

  const handleChange = e => {
    setInputs(prev=>({...prev, [e.target.name]:e.target.value}))
  }

  const handleSubmit = async e => {
    e.preventDefault()
    try{
      await axios.post('http://localhost:8800/api/auth/register', inputs)
      navigate("/login");
    }
    catch(e) {
      setError(e.response.data)
      console.log('Error in register.jsx')
    }
    
  }
  
  return (
    <div className='auth'>
        <h1>REGISTER</h1>
        <form action="">
            <input type="email" required name="email" placeholder="email" onChange={handleChange}/>
            <input type="text" required name="name" placeholder="name" onChange={handleChange} />
            <input type="text" required name="surname" placeholder="surname" onChange={handleChange} />
            <input type="password" required name="password" placeholder="password" id="" onChange={handleChange} />
            <button onClick={handleSubmit} >REGISTER</button>
            {err && <p>{err}</p>  }
            <span>Already have an account? <Link to='/login'>Login</Link></span>
        </form>
    </div>
  )
}

export default Register