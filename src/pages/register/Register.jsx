import React from 'react';
import "./register.css";
import { Link } from 'react-router-dom';
import axios from 'axios';
export default function Register() {
  const [username, setUsername] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(false);
    try {
      const res = await axios.post("/api/auth/register", {
        username,
        email,
        password,
      });
      res.data && window.location.replace("/login");
    } catch (error) {
      setError(true);
      console.log(error);
    }
    
    
  };

  return (
    <div className='register'>
        <span className="registerTitle">Register</span>
        <form className='registerForm' onSubmit={handleSubmit}>
            <label>Username</label>
            <input 
              type="text" 
              className='registerInput' 
              placeholder='Enter your username..' 
              onChange={e => setUsername(e.target.value)}
            />
            <label>Email</label>
            <input 
              type="text" 
              className='registerInput' 
              placeholder='Enter your email..'
              onChange={e => setEmail(e.target.value)}
            />
            <label>Password</label>
            <input 
              type="password" 
              className='registerInput' 
              placeholder='Enter your password..' 
              onChange={e => setPassword(e.target.value)}  
            />
            <button className="registerButton" type='submit'>Register</button>    
        </form>
        <button className="registerLoginButton">
            <Link className='link' to="/login">Login</Link>
        </button>
        {error && <span style={{color: "red", marginTop: "10px"}}>Something went wrong!</span>}
    </div>
  )
}
