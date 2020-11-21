import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useInput } from "../hooks/useInput";
import { userLogin, checkMe, userLogout } from "../actions/user";
import { useHistory } from "react-router-dom";

const Login = () => {
  const history = useHistory();
  const user = useSelector((state) => state.user.user);
  const [username, _u, handleUsername] = useInput("");
  const [password, _p, handlePassword] = useInput("");

  const dispatch = useDispatch();

  const onSubmit = async (e) => {
    e.preventDefault();
    await await dispatch(userLogin(username, password));
  };

  const me = async () => {
    await dispatch(checkMe());
  };

  const logout = async () => {
    await dispatch(userLogout());
  };

  useEffect(() => {
    if (user) {
      if (user.role === "INSTRUCTOR" || user.role === "ADMIN")
        history.push("/lessons");
      else history.push("/");
    }
  }, [user]);

  return (
    <div>
      <form onSubmit={onSubmit}>
        <h2>Login</h2>
        <input
          type="text"
          placeholder="Enter username"
          onChange={handleUsername}
        />
        <input
          type="password"
          placeholder="Enter password"
          onChange={handlePassword}
        />
        <button type="submit">Log In</button>
      </form>
      <button onClick={() => me()}>Check Me</button>
      <button onClick={() => logout()}>Logout</button>
    </div>
  );
};

export default Login;
