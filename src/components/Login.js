import React from "react";

const Login = () => {
  return (
    <div>
      <form>
        <h2>Login</h2>
        <input email="email" type="text" placeholder="Enter email" />
        <input password="password" type="text" placeholder="Enter password" />
      </form>
    </div>
  );
};

export default Login;
