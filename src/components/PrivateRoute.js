import React from 'react';
import { Route, Redirect } from 'react-router-dom';


/* PR REQS
    - It has the same API as <Route />
    -It renders a <Route /> and passes all the props to it
    -It checks if the user is authenticated. If they are render the components passed in as a prop.
        Otherwise redirect to login page
*/


const PrivateRoute = ({ component: Component, ...rest }) => {
    return (
        <Route
            {...rest}
            render={props => {
                if (localStorage.getItem("token")) {
                    //if the token is in localStorage render the component
                    return <Component {...props} />;
                } else {
                    //if not present redirect to login page
                    /* return <Redirect to="" />;  PLACEHOLDER*/
                }
            }}
        />
    )

};

export default PrivateRoute;