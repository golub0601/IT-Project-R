import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

const Register = () => {
  const [inputs, setInputs] = useState ({
    name : '',
    email : '',
    password : ''
  })

  const handleChange = e => {
    setInputs(prev=>({...prev, [e.target.name]:e.target.value}))
  }

  const handleSubmit = async e => {
    e.preventDefault()
    try{
      const res = await axios.post('http://localhost:8800/api/auth/register', inputs)
      console.log(res)
    }
    catch(e) {
      console.log(e);
      console.log('Error in register.jsx')
    }
    
  }
  
  return (
    <div className='auth'>
        <h1>REGISTER</h1>
        <form action="">
            <input type="email" required name="email" placeholder="email" onChange={handleChange}/>
            <input type="text" required name="name" placeholder="name" onChange={handleChange} />
            <input type="password" required name="password" placeholder="password" id="" onChange={handleChange} />
            <button onClick={handleSubmit} >REGISTER</button>
            <p>THIS IS AN ERROR PARAGRAPH!</p>  {/* hidden */}
            <span>Already have an account? <Link to='/login'>Login</Link></span>
        </form>
    </div>
  )
}

export default Register