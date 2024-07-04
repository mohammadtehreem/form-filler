import { Navigate } from "react-router-dom";

export const PrivateRoutes = ({ children }) => {
  const loggedIn = localStorage.getItem("jwtToken");
  if (loggedIn) {
    return children;
  } else {
    return <Navigate to="/login" />;
  }
};
