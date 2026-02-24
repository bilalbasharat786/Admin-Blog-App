import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);

  if (loading) return <div className="text-center mt-20 text-xl font-bold">Loading...</div>;
  if (!user || user.role !== "admin") {
    return <Navigate to="/admin-login" replace />;
  }
  return children;
};

export default ProtectedRoute;