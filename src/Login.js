import React from 'react'
import { useState } from 'react'
import './loginform.css'
import axios from 'axios'
import { Link,useNavigate } from 'react-router-dom'
export default function Login() {
    const navigate=useNavigate()
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    
    const handleEmail=(e)=>{
        setEmail(e.target.value)
    }

    const handlePassword=(e)=>{
        setPassword(e.target.value)
    }
    const handleApi = () => {
        console.log({ email, password })
        axios.post('https://reqres.in/api/login', {
          email: email,
          password: password
        }).then(result => {
          console.log(result.data)
          alert('success')
          localStorage.setItem('token',result.data.token)
          navigate('/home')
        })
          .catch(error => {
            alert('service error')
            console.log(error)
          })
      }
  return (
    <div className="cover">
        <h1>Login</h1>
        <input type="text"  value={email} onChange={handleEmail} placeholder="username" />
        <input type="password" value={password} onChange={handlePassword} placeholder="password" />

        <button className="login-btn" onClick={handleApi} >Login</button>

        <p className="text">Or login using</p>

        <div className="alt-login">
            <div className="facebook"></div>
            <div className="google">
                
            </div>
        </div>

        {/* <div className={popupStyle}>
            <h3>Login Failed</h3>
            <p>Username or password incorrect</p>
        </div> */}
        
    </div>
  )
}
