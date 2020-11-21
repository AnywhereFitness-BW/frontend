import React from "react";
import Register from "./components/Register";
import Login from "./components/Login";
import styled from "styled-components";
import { Route, Link, Switch, useHistory } from "react-router-dom";

const BodyBackground = styled.div`
  background-color: #483d8b;
`;
function App() {
  const history = useHistory();
  history.push("/register");

  return (
    <BodyBackground>
      <div className="App">
        {/* <h1>FITNESS ANYWHERE</h1> */}
        {/* <h1>Login</h1>
      <h2>Get Started</h2> */}
        <Switch>
          {/* <Register /> */}
          {/* <PrivateRoute exact path="" component={} /> */}
          {/* <PrivateRoute exact path="" component={} /> */}
          {/* <PrivateRoute exact path="" component={} /> */}
          {/* <PrivateRoute exact path="" component={} /> */}

          {/* path to login/sign up forms/component */}
          <Route path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          {/* <Route path="/signUp" component={} /> */}
        </Switch>
      </div>
    </BodyBackground>
  );
}

export default App;
