import React from "react";
import { Route, Redirect } from "react-router-dom";
import Auth from "../services";

const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        // let token = Auth.getCipher();
        // if (!token) {
        //   return <Redirect to={{ pathname: "/login" }} />;
        // }
        return <Component />;
      }}
    />
  );
};

export default PrivateRoute;
