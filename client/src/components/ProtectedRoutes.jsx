import { Outlet, Navigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../context/userContext";

const ProtectedRoutes = ({ children }) => {
    const { user, loading } = useContext(UserContext);
    console.log(`tässä on protRout ${user } + ${loading}`)
    if (loading) return <div>Loading...</div>
    if (!user) return <Navigate to="/login" replace />;

    return children ? children : <Outlet />;
}

export default ProtectedRoutes;