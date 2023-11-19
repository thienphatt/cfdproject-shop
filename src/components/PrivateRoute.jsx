import React from "react";
import { Navigate, Outlet, redirect } from "react-router-dom";
import tokenMethod from "../utils/token";

const PrivateRoute = ({ redirectPath = "/" }) => {
    if (!!!tokenMethod.get()) {
        return <Navigate to={redirectPath} />;
    }

    return <Outlet />;
};

export default PrivateRoute;
