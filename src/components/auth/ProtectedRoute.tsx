import { Navigate } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const { isAuthenticated, loading } = useAuthStore();

    if (loading) return null;

    if (!isAuthenticated) return <Navigate to="/login" replace />;

    return children;
};
