import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import {jwtDecode} from 'jwt-decode'

const ProtectedRoutes = ({ children, allowedRoles }) => {
    const { token, role, isAuthenticated } = useSelector((state) => state.auth);

    // If not authenticated → redirect
    if (!isAuthenticated || !token) {
        return <Navigate to="/login" />;
    }

    // Decode token and check expiry
    try {
        const { exp } = jwtDecode(token);
        if (Date.now() >= exp * 1000) {
            return <Navigate to="/login" />;
        }
    } catch (err) {
        // If token is invalid/corrupted → redirect
        return <Navigate to="/login" />;
    }

    // Role check
    if (allowedRoles && !allowedRoles.includes(role)) {
        return <Navigate to="/unauthorized" />;
    }

    return children;
};

export default ProtectedRoutes;