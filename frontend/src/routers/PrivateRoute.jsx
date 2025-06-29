import React from 'react'
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({children}) => {
    const {currentUser, loading} = useAuth();
    
    if (loading) {
        return <div className="text-center text-gray-500">Loading...</div>
    }
    if (currentUser) {
        return children;
    }

    return <Navigate to="/login" replace/>
}

export default PrivateRoute