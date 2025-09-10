

import React, { useEffect, useState } from "react";
import API from "../api";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

function StudentDashboard() {
	const [profile, setProfile] = useState({});
	const [form, setForm] = useState({});
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");
	const [successMessage, setSuccessMessage] = useState("");

	const { logout, user } = useAuth();
	const navigate = useNavigate();

	const fetchProfile = async () => {
		setLoading(true);
		try {
			const res = await API.get("/students/me");
			setProfile(res.data);
			setForm(res.data);
			setError("");
		} catch (err) {
			console.error("Error fetching profile:", err);
			setError("Failed to fetch profile");
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchProfile();
	}, []);

	const handleChange = (e) => {
		setForm({ ...form, [e.target.name]: e.target.value });
		setSuccessMessage(""); // Clear success message when editing
	};

	const handleUpdate = async (e) => {
		e.preventDefault();
		setLoading(true);
		setError("");
		setSuccessMessage("");

		try {
			await API.put("/students/me", form);
			await fetchProfile();
			setSuccessMessage("Profile updated successfully!");
		} catch (err) {
			console.error("Error updating profile:", err);
			setError(err.response?.data?.message || "Error updating profile");
		} finally {
			setLoading(false);
		}
	};

	const handleLogout = () => {
		logout();
		navigate("/login");
	};

	if (loading && !form.name) {
		return (
			<div className='dashboard'>
				<div className='loading'>Loading your profile...</div>
			</div>
		);
	}

	return (
		<div className='dashboard'>
			<div className='dashboard-header'>
				<h2>Student Dashboard</h2>
				<div className='user-info'>
					<span>Welcome, {user?.name || profile.name || "Student"}</span>
					<button onClick={handleLogout} className='logout-btn'>
						Logout
					</button>
				</div>
			</div>

			{error && <div className='error-message'>{error}</div>}
			{successMessage && (
				<div className='success-message'>{successMessage}</div>
			)}

			<div className='profile-section'>
				<h3>Your Profile</h3>
				<form onSubmit={handleUpdate} className='profile-form'>
					<div className='form-group'>
						<label>Name:</label>
						<input
							type='text'
							name='name'
							placeholder='Your name'
							value={form.name || ""}
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
							placeholder='Your email'
							value={form.email || ""}
							onChange={handleChange}
							required
							disabled={loading}
						/>
					</div>

					<div className='form-group'>
						<label>Course:</label>
						<input
							type='text'
							name='course'
							placeholder='Your course'
							value={form.course || ""}
							onChange={handleChange}
							disabled={loading}
						/>
					</div>

					<button type='submit' className='update-btn' disabled={loading}>
						{loading ? "Updating..." : "Update Profile"}
					</button>
				</form>
			</div>

			{profile.enrollmentDate && (
				<div className='enrollment-info'>
					<h3>Enrollment Information</h3>
					<p>
						<strong>Enrollment Date:</strong>{" "}
						{new Date(profile.enrollmentDate).toLocaleDateString()}
					</p>
				</div>
			)}
		</div>
	);
}

export default StudentDashboard;
