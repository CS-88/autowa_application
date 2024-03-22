// Login.jsx
import React, { useState } from 'react';
import './Login.css'; 

function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent default form submission
    try {
      const response = await fetch('http://localhost:5500/api/auth/login/web', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }), // Send email and password
      });
      let responseData = await response.json();
      if (response.ok) {
        if(responseData.Error){
          console.log(responseData.Error+ "in error")
          return;
        }
        if(responseData.email){
          localStorage.setItem('userEmail', JSON.stringify(responseData.email));
          onLogin(responseData); // Call onLogin with response data
        }
      } else {
        setError(responseData.message); // Display error message
      }
    } catch (error) {
      console.error('Error:', error);
      setError('An unexpected error occurred. Please try again later.');
    }
  };
  
  return (
    <div className="login-container">
      <div className="form-box"> {/* Added container for the entire form */}
        <h2 className='login-text'>Login</h2>
        <br />
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleLogin}>
          <div className="form-group-container"> {/* Added container */}
            <div className="form-group">
              <label>Email: <br /> </label>
              <br />
              <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
           
            <div className="form-group">
              <label>Password:<br/> </label>
              <br />
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
          </div>
          <button className='submit' type="submit">Login</button>
        </form>
      </div>
    </div>
  );
  
}

export default Login;
