import { Navigate } from "react-router-dom";

export const PrivateRoutes = ({ children }) => {
  const loggedIn = false;
  if (loggedIn) {
    return children;
  } else {
    return <Navigate to="/login" />;
  }
};
