// // frontend/src/components/ProtectedRoute.js
// import React from "react";
// import { Navigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";

// const ProtectedRoute = ({ children, requiredRole }) => {
// 	const { user } = useAuth();

// 	if (!user) {
// 		return <Navigate to='/login' replace />;
// 	}

// 	if (requiredRole && user.role !== requiredRole) {
// 		// Redirect to appropriate dashboard based on role
// 		const redirectPath =
// 			user.role === "admin" ? "/admin-dashboard" : "/student-dashboard";
// 		return <Navigate to={redirectPath} replace />;
// 	}

// 	return children;
// };

// export default ProtectedRoute;
// src/components/ProtectedRoute.js
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children, requiredRole }) => {
	const { user, loading } = useAuth();

	// Show loading while checking authentication
	if (loading) {
		return (
			<div
				style={{
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					height: "100vh",
				}}>
				Loading...
			</div>
		);
	}

	// Redirect to login if not authenticated
	if (!user) {
		return <Navigate to='/login' replace />;
	}

	// Redirect to appropriate dashboard if role doesn't match
	if (requiredRole && user.role !== requiredRole) {
		const redirectPath =
			user.role === "admin" ? "/admin-dashboard" : "/student-dashboard";
		return <Navigate to={redirectPath} replace />;
	}

	return children;
};

export default ProtectedRoute;
