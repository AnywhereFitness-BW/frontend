import React, { useState } from "react";
import axios from "axios";

const Login = () => {
  const [login, setLogin] = useState({
    email: "",
    password: "",
  });

  const [loginIsDisabled, setLoginIsDisabled] = useState(true);

  const onInputChange = (event) => {
    setLogin({
      ...login,
      [event.target.name]: event.target.value,
    });
  };

  console.log("setLogin", setLogin);
  return (
    <div>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          axios.get(`?login=${login}`);
        }}
      >
        <h2>Login</h2>
        <input
          onChange={onInputChange}
          name="email"
          email="email"
          type="text"
          placeholder="Enter email"
          value={login.email}
        />
        <input
          onChange={onInputChange}
          name="password"
          password="password"
          type="text"
          placeholder="Enter password"
          value={login.password}
        />
        {/* <input type="submit" /> */}
        <button type="submit" disabled={loginIsDisabled}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default Login;
