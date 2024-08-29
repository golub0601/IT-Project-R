import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import "../style/login_register.scss"

const Login = () => {

  const [err, setError] = useState(null);
  return (
    <div className='auth'>
        <h1>LOGIN</h1>
        <form action="">
            <input required type="text" name="username" placeholder="username" />
            <input required type="password" name="password" placeholder="password" id="" />
            <button>LOGIN</button>
            {err && <p>{err}</p>  }
            <span>Do not have account? <Link to='/register'>Register</Link></span>
        </form>
    </div>
  )
}

export default Login