import React, { useState } from 'react'
import { useLogin } from '../hooks/UseLogin';

function Login() {
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const { login, isLoading, error } = useLogin();

    const handleSubmit = async(e)=>{
        e.preventDefault();  // to stop refersh onclick
        await login(email,password)
    }

  return (
    <form onSubmit={handleSubmit} className='position-absolute top-50 start-50 translate-middle text-center border border-warning p-5'>
        <h1>Login</h1>      
        <input type='mail' className='form-control mt-4' placeholder='Enter Your Mail ID' value={email} onChange={(event)=>(setEmail(event.target.value))}></input>
        <div id="emailHelp" className="form-text mb-4">We'll never share your email with anyone else.</div>
        <input type='password' className='form-control mb-4' placeholder='Enter Your Password' value={password} onChange={(event)=>(setPassword(event.target.value))}></input>
        <button className='btn btn-warning' disabled={isLoading}>Login</button>
        {error && <div className='text-danger  mt-4'>{error}</div>}
    </form>
  )
}

export default Login