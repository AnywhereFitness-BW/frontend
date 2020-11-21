import React from "react";
import { Route, Redirect } from "react-router-dom";
import LocalStorage from "../utilities/localStorage";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const user = LocalStorage("af-user").get();
  return (
    <Route
      {...rest}
      render={(props) => {
        if (user) return <Component {...props} />;
        else return <Redirect to="/login" />;
      }}
    />
  );
};

export default PrivateRoute;
