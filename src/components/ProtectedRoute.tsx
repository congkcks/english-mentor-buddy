import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/components/AuthContext';

interface ProtectedRouteProps {
    children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const { user } = useAuth();

    if (!user) {
        return <Navigate to="/" replace />; // Chuyển hướng về /login (mà bạn đặt là /)
    }

    return <>{children}</>;
};

export default ProtectedRoute;