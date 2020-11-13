import "./App.css";
import React from "react";

import { Route, Link, Switch, useHistory } from "react-router-dom";

function App() {
  const history = useHistory();
  // history.push("/login");

  return (
    <div className="App">
      <h1>FITNESS ANYWHERE</h1>
      <h1>Login</h1>
      <h2>Get Started</h2>
      <Switch>
        {/* <PrivateRoute exact path="" component={} /> */}
        {/* <PrivateRoute exact path="" component={} /> */}
        {/* <PrivateRoute exact path="" component={} /> */}
        {/* <PrivateRoute exact path="" component={} /> */}

        {/* path to login/sign up forms/component */}
        {/* <Route path="/login" component={} />
        <Route exact path="/" component={} />
        <Route path="/signUp" component={} /> */}
      </Switch>
    </div>
  );
}

export default App;
