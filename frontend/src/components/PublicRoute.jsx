import { Navigate } from "react-router-dom";

const PublicRoute = ({ children }) => {
  if (localStorage.getItem("token")) {
    return children;
  } else {
    <Navigate to="/login" />;
  }
};

export default PublicRoute;
