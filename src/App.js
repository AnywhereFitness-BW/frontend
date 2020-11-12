import './App.css';
import React from 'react';

import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";


function App() {
  return (
    <div className="App">
      <Router>
        <h1>FITNESS ANYWHERE</h1>
        <h1>Login</h1>
        <h2>Get Started</h2>
        <Switch>
          <PrivateRoute exact path='' component={/* PLACEHOLDER */}  />
          <PrivateRoute exact path='' component={/* PLACEHOLDER */}/>
          <PrivateRoute exact path='' component={/* PLACEHOLDER */}/>
          <PrivateRoute exact path='' component={/* PLACEHOLDER */}/>

          {/* path to login/sign up forms/component */}
          <Route path='/login' component={/* COMPONENT HERE */} />
          <Route path='/signUp' component={/* COMPONENT HERE */} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
