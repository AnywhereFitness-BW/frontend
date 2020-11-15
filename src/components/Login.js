import React, { useState } from "react";
import axios from "axios";

const Login = () => {
  const [login, setLogin] = useState({
    email: "",
    password: "",
  });

  const [submitIsDisabled, setSubmitIsDisabled] = useState(true);

  const onInputChange = (event) => {
    setLogin({
      ...login,
      [event.target.name]: event.target.value,
    });
  };

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
        <input type="submit" />
      </form>
    </div>
  );
};

export default Login;
