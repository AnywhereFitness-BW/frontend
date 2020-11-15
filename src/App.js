import React from "react";
import Register from "./components/Register";
import Login from "./components/Login";

import { Route, Link, Switch, useHistory } from "react-router-dom";

function App() {
  const history = useHistory();
  history.push("/login");

  return (
    <div className="App">
      <h1>FITNESS ANYWHERE</h1>
      <h1>Login</h1>
      <h2>Get Started</h2>
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
  );
}

export default App;
