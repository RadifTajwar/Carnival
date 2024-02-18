import React, {Fragment} from "react";
import {useSelector} from "react-redux";
import {Navigate} from "react-router-dom";
import Loader from '../layout/loader/Loader'



const ProtectedRoute = ({isAdmin, component: Component, ...rest}) => {
    const {loading, isAuthenticated, user} = useSelector((state) => state.user);


    if (isAuthenticated === false) {
        return <Navigate to="/login"/>;
    }

    if (isAdmin === true && user.role !== 'admin') {
        return <Navigate to="/login"/>
    }


    return (
        <Fragment>
            {loading ? (
                <Loader/>
            ) : (
                <Component {...rest} />
            )}
        </Fragment>
    );
};

export default ProtectedRoute;