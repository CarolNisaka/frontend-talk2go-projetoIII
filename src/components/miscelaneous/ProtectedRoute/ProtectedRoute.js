import React from "react";
import { Navigate } from 'react-router-dom';

function ProtectedRoute ({ isUserLogged, Page, ...rest}) {
    return (isUserLogged ? <Page {...rest} /> : <Navigate to="/" />);
}

export default ProtectedRoute;