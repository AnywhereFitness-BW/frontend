import React from "react";
import { Route, Link, Switch, useHistory } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import PrivateRoute from "./components/PrivateRoute";
import ClientDash from "./components/clientDash";
import TrainerDash from "./components/trainerDash";
import BrowseClasses from "./components/browseClasses";
import ViewClass from "./components/ViewClass";
import EditClass from "./components/EditClass";
import axios from "axios";
import NavBar from "./components/NavBar";
import { Container } from "reactstrap";
import Messages from "./components/Messages";
import CreateClass from "./components/CreateClass";

const BodyBackground = styled.div`
  background-color: #483d8b;
`;
function App() {
  axios.defaults.withCredentials = true;
  axios.defaults.baseURL = "https://lit-savannah-98479.herokuapp.com";
  // axios.defaults.baseURL = "http://localhost:5000/";

  // const history = useHistory();
  // history.push("/login");

  return (
    <Container>
      <NavBar />
      <Messages />
      <Switch>
        <PrivateRoute exact path="/" component={ClientDash} />
        <PrivateRoute exact path="/classes" component={BrowseClasses} />
        <PrivateRoute exact path="/classes/:id" component={ViewClass} />
        <PrivateRoute exact path="/classes/:id/edit" component={EditClass} />
        <PrivateRoute exact path="/lessons" component={TrainerDash} />
        <PrivateRoute exact path="/lessons/new" component={CreateClass} />

        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
      </Switch>
    </Container>
  );
}

export default App;
