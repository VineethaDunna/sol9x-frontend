import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Auth.css";

function Signup() {
	const [form, setForm] = useState({
		name: "",
		email: "",
		password: "",
		course: "", // Only for student
		role: "student", // default role
	});
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();
	const { signup } = useAuth(); // Use signup from context if available

	const handleChange = (e) => {
		setForm({ ...form, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		setError("");

		try {
			// If AuthContext has signup function, use it
			if (signup) {
				const result = await signup(
					form.name,
					form.email,
					form.password,
					form.role,
					form.course
				);
				if (result.success) {
					alert("Account created successfully! Please login.");
					navigate("/login");
				} else {
					setError(result.message || "Signup failed");
				}
			} else {
				// Fallback to direct API call
				const API = await import("../api").then((m) => m.default);
				const res = await API.post("/auth/signup", form);

				// Check for successful response
				if (res.status === 201 || res.status === 200) {
					alert("Account created successfully! Please login.");
					navigate("/login");
				} else {
					setError(res.data?.message || "Signup failed");
				}
			}
		} catch (err) {
			console.error("Signup error:", err);
			setError(err.response?.data?.message || "Signup failed");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className='auth-container'>
			<div className='auth-card'>
				<h2>Sign Up</h2>
				{error && <div className='error-message'>{error}</div>}

				<form onSubmit={handleSubmit} className='auth-form'>
					<div className='form-group'>
						<label>Name:</label>
						<input
							type='text'
							name='name'
							placeholder='Enter your name'
							value={form.name}
							onChange={handleChange}
							required
							disabled={loading}
						/>
					</div>

					<div className='form-group'>
						<label>Email:</label>
						<input
							type='email'
							name='email'
							placeholder='Enter your email'
							value={form.email}
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
							placeholder='Enter your password'
							value={form.password}
							onChange={handleChange}
							required
							minLength={6}
							disabled={loading}
						/>
					</div>

					<div className='form-group'>
						<label>Role:</label>
						<select
							name='role'
							value={form.role}
							onChange={handleChange}
							required
							disabled={loading}>
							<option value='student'>Student</option>
							<option value='admin'>Admin</option>
						</select>
					</div>

					{form.role === "student" && (
						<div className='form-group'>
							<label>Course:</label>
							<input
								type='text'
								name='course'
								placeholder='e.g., MERN Bootcamp'
								value={form.course}
								onChange={handleChange}
								required={form.role === "student"}
								disabled={loading}
							/>
						</div>
					)}

					<button type='submit' className='auth-button' disabled={loading}>
						{loading ? "Creating Account..." : "Sign Up"}
					</button>
				</form>

				<div className='auth-links'>
					<p>
						Already have an account? <Link to='/login'>Login</Link>
					</p>
				</div>
			</div>
		</div>
	);
}

export default Signup;
