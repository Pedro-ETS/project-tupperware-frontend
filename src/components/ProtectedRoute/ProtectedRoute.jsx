  import React from "react";
  import { Route, Navigate } from "react-router-dom";

  function ProtectedRoute({ token, element }) { 
    return token ? element : <Navigate to={"/signin"} />; 
  }

  export default ProtectedRoute;
