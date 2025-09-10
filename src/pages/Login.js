// // import React, { useState, useEffect } from "react";
// // import { Link, useNavigate } from "react-router-dom";
// // import { useAuth } from "../context/AuthContext";
// // import "./Auth.css";
// // import API from "../api";

// // const Login = () => {
// // 	const [formData, setFormData] = useState({
// // 		email: "",
// // 		password: "",
// // 	});
// // 	const [error, setError] = useState("");
// // 	const [loading, setLoading] = useState(false);

// // 	const { login, user } = useAuth();
// // 	const navigate = useNavigate();

// // 	// Redirect if already logged in
// // 	useEffect(() => {
// // 		if (user) {
// // 			const redirectPath =
// // 				user.role === "admin" ? "/admin-dashboard" : "/student-dashboard";
// // 			navigate(redirectPath, { replace: true });
// // 		}
// // 	}, [user, navigate]);

// // 	const handleChange = (e) => {
// // 		setFormData({
// // 			...formData,
// // 			[e.target.name]: e.target.value,
// // 		});
// // 	};

// // 	const handleSubmit = async (e) => {
// // 		e.preventDefault();
// // 		try {
// // 			const { email, password } = formData;
// // 			const res = await API.post("/auth/login", { email, password });
// // 			if (res.status === 200) {
// // 				// Save token, redirect, etc.
// // 				console.log("Login successful", res.data);
// // 				// e.g. setAuthToken(res.data.token);
// // 			} else {
// // 				setError(res.data.message || "Login failed");
// // 			}
// // 		} catch (err) {
// // 			setError(err.response?.data?.message || "Login failed");
// // 		}
// // 	};

// // 	return (
// // 		<div className='auth-container'>
// // 			<div className='auth-card'>
// // 				<h2>Login</h2>
// // 				{error && <div className='error-message'>{error}</div>}

// // 				<form onSubmit={handleSubmit} className='auth-form'>
// // 					<div className='form-group'>
// // 						<label>Email:</label>
// // 						<input
// // 							type='email'
// // 							name='email'
// // 							value={formData.email}
// // 							onChange={handleChange}
// // 							required
// // 							disabled={loading}
// // 						/>
// // 					</div>

// // 					<div className='form-group'>
// // 						<label>Password:</label>
// // 						<input
// // 							type='password'
// // 							name='password'
// // 							value={formData.password}
// // 							onChange={handleChange}
// // 							required
// // 							disabled={loading}
// // 						/>
// // 					</div>

// // 					<button type='submit' className='auth-button' disabled={loading}>
// // 						{loading ? "Logging in..." : "Login"}
// // 					</button>
// // 				</form>

// // 				<div className='auth-links'>
// // 					<p>
// // 						Don't have an account? <Link to='/signup'>Sign up here</Link>
// // 					</p>
// // 				</div>
// // 			</div>
// // 		</div>
// // 	);
// // };

// // export default Login;
// import React, { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";
// import "./Auth.css";
// import API from "../api";

// const Login = () => {
// 	const [formData, setFormData] = useState({
// 		email: "",
// 		password: "",
// 	});
// 	const [error, setError] = useState("");
// 	const [loading, setLoading] = useState(false);

// 	const { login, user } = useAuth();
// 	const navigate = useNavigate();

// 	// Redirect if already logged in
// 	useEffect(() => {
// 		if (user) {
// 			const redirectPath =
// 				user.role === "admin" ? "/admin-dashboard" : "/student-dashboard";
// 			navigate(redirectPath, { replace: true });
// 		}
// 	}, [user, navigate]);

// 	const handleChange = (e) => {
// 		setFormData({
// 			...formData,
// 			[e.target.name]: e.target.value,
// 		});
// 	};

// 	const handleSubmit = async (e) => {
// 		e.preventDefault();
// 		setLoading(true);
// 		setError("");

// 		try {
// 			const { email, password } = formData;
// 			const res = await API.post("/auth/login", { email, password });

// 			if (res.status === 200) {
// 				// Call the login function from AuthContext
// 				// This should set the token and user in context
// 				await login(res.data.token, res.data.user);

// 				// Navigation will be handled by the useEffect above
// 				console.log("Login successful", res.data);
// 			} else {
// 				setError(res.data.message || "Login failed");
// 			}
// 		} catch (err) {
// 			console.error("Login error:", err);
// 			setError(err.response?.data?.message || "Login failed");
// 		} finally {
// 			setLoading(false);
// 		}
// 	};

// 	return (
// 		<div className='auth-container'>
// 			<div className='auth-card'>
// 				<h2>Login</h2>
// 				{error && <div className='error-message'>{error}</div>}

// 				<form onSubmit={handleSubmit} className='auth-form'>
// 					<div className='form-group'>
// 						<label>Email:</label>
// 						<input
// 							type='email'
// 							name='email'
// 							value={formData.email}
// 							onChange={handleChange}
// 							required
// 							disabled={loading}
// 						/>
// 					</div>

// 					<div className='form-group'>
// 						<label>Password:</label>
// 						<input
// 							type='password'
// 							name='password'
// 							value={formData.password}
// 							onChange={handleChange}
// 							required
// 							disabled={loading}
// 						/>
// 					</div>

// 					<button type='submit' className='auth-button' disabled={loading}>
// 						{loading ? "Logging in..." : "Login"}
// 					</button>
// 				</form>

// 				<div className='auth-links'>
// 					<p>
// 						Don't have an account? <Link to='/signup'>Sign up here</Link>
// 					</p>
// 				</div>
// 			</div>
// 		</div>
// 	);
// };

// export default Login;
// src/pages/Login.js
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Auth.css";
import API from "../api";

const Login = () => {
	const [formData, setFormData] = useState({
		email: "",
		password: "",
	});
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);

	const { login, user } = useAuth();
	const navigate = useNavigate();

	// Redirect if already logged in
	useEffect(() => {
		console.log("Current user in Login:", user);
		if (user) {
			const redirectPath =
				user.role === "admin" ? "/admin-dashboard" : "/student-dashboard";
			console.log("Redirecting to:", redirectPath);
			navigate(redirectPath, { replace: true });
		}
	}, [user, navigate]);

	const handleChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		setError("");

		try {
			const { email, password } = formData;
			// Call login from AuthContext passing email and password
			const res = await login(email, password);

			if (res.success) {
				// On successful login, user context is updated and useEffect handles navigation
				console.log("Login successful:", res);
			} else {
				setError(res.message || "Login failed");
			}
		} catch (err) {
			console.error("Login error:", err);
			setError(err.message || "Login failed");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className='auth-container'>
			<div className='auth-card'>
				<h2>Login</h2>
				{error && <div className='error-message'>{error}</div>}

				<form onSubmit={handleSubmit} className='auth-form'>
					<div className='form-group'>
						<label>Email:</label>
						<input
							type='email'
							name='email'
							value={formData.email}
							onChange={handleChange}
							required
							disabled={loading}
						/>
					</div>

					<div className='form-group'>
						<label>Password:</label>
						<input
							type='password'
							name='password'
							value={formData.password}
							onChange={handleChange}
							required
							disabled={loading}
						/>
					</div>

					<button type='submit' className='auth-button' disabled={loading}>
						{loading ? "Logging in..." : "Login"}
					</button>
				</form>

				<div className='auth-links'>
					<p>
						Don't have an account? <Link to='/signup'>Sign up here</Link>
					</p>
				</div>
			</div>
		</div>
	);
};

export default Login;
