import React, { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { Navigate } from "react-router-dom";

export const RequireAuth = ({ children, status }) => {
  const userContext = useContext(UserContext);

  if (!userContext.state.user && status === "protected")
    return <Navigate to="/login" replace={true} />;
  else if (userContext.state.user && status === "public")
    return (
      <Navigate to={`/${userContext.state.user}/my-listings`} replace={true} />
    );
  else return children;
};
