import { Outlet, Navigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../context/userContext";

const AdminRoutes = ({ children }) => {
  const { user, loading } = useContext(UserContext);
  if (loading) return <div>Loading...</div>;
  if (!user) return <Navigate to="/login" replace />;
  if (user.role !== "admin")
    return (
      <h1 className="text-center text-error text-2xl m-50">
        You do not have permission to access this page.
      </h1>
    );
  return children ? children : <Outlet />;
};

export default AdminRoutes;
