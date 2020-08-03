import React from 'react';
import PropTypes from "prop-types";
import {Route, Redirect} from "react-router-dom";

const PublicRoute = ({
    isAuth,
    component: Component,
    ...rest
}) => {

    return ( 
        <Route 
            {...rest}
            component={(props) => (
                (isAuth) 
                ? (<Redirect to="/"/>)
                : (<Component {...props}/>)
            )}
        />
     );
}
 
export default PublicRoute;


PublicRoute.propTypes = {
    isAuth: PropTypes.bool.isRequired,
    component: PropTypes.func.isRequired,
    
}