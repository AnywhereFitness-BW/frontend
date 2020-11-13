import React from 'react';

const Login = () => {
  return (
    <div>
    <form>
      <h2>Login</h2>
      <input
        email='email'
        type='text'
        placeholder='Enter email'
      /><br/>
      <input
        password='password'
        type='text'
        placeholder='Enter password'
      /><br/>
    </form>
    </div>
 )
};

export default Login;