import React, { createContext, useState, useEffect, useContext } from "react";
import API from "../api"; // axios instance

const AuthContext = createContext();

export function useAuth() {
	return useContext(AuthContext);
}

export function AuthProvider({ children }) {
	const [user, setUser] = useState(null); // user info + role
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		// check localStorage for token and get user data on app load
		const token = localStorage.getItem("token");
		if (token) {
			API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
			API.get("/auth/me")
				.then((res) => setUser(res.data))
				.catch(() => logout());
		}
		setLoading(false);
	}, []);

	const login = async (email, password) => {
		try {
			const { data } = await API.post("/auth/login", { email, password });
			localStorage.setItem("token", data.token);
			API.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;
			setUser(data.user);
			return { success: true, role: data.user.role };
		} catch (err) {
			return {
				success: false,
				message: err.response?.data?.message || "Login failed",
			};
		}
	};

	const signup = async (name, email, password, role, course) => {
		try {
			const signupData = {
				name,
				email,
				password,
				role: role || "student",
			};

			// Only add course if role is student
			if (role === "student" && course) {
				signupData.course = course;
			}

			const { data } = await API.post("/auth/signup", signupData);

			return {
				success: true,
				message: data.message || "Signup successful",
			};
		} catch (err) {
			return {
				success: false,
				message: err.response?.data?.message || "Signup failed",
			};
		}
	};

	const logout = () => {
		localStorage.removeItem("token");
		setUser(null);
		delete API.defaults.headers.common["Authorization"];
	};

	const value = { user, login, signup, logout, loading };

	return (
		<AuthContext.Provider value={value}>
			{!loading && children}
		</AuthContext.Provider>
	);
}
