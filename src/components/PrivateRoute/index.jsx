import React from "react";
import { Outlet } from "react-router-dom";

const PrivateRoute = ({ redirectPath = "/" }) => {
  return <Outlet />;
};

export default PrivateRoute;
