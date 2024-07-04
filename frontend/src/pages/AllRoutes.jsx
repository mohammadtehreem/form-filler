import { Routes, Route } from "react-router-dom";
import { Home } from "./Home";
import { Login } from "./Login";
import { Register } from "./Register";
import { PrivateRoutes } from "./PrivateRoutes";

export const AllRoutes = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <PrivateRoutes>
            <Home />
          </PrivateRoutes>
        }
      />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
};
