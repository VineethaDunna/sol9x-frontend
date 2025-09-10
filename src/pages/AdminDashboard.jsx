

import React, { useEffect, useState } from "react";
import API from "../api";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

function AdminDashboard() {
	const [students, setStudents] = useState([]);
	const [form, setForm] = useState({ name: "", email: "", course: "" });
	const [editId, setEditId] = useState(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");

	const { logout, user } = useAuth();
	const navigate = useNavigate();

	const fetchStudents = async () => {
		setLoading(true);
		try {
			const res = await API.get("/students");
			setStudents(res.data);
			setError("");
		} catch (err) {
			console.error("Error fetching students:", err);
			setError("Failed to fetch students");
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchStudents();
	}, []);

	const handleChange = (e) =>
		setForm({ ...form, [e.target.name]: e.target.value });

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);

		try {
			if (editId) {
				await API.put(`/students/${editId}`, form);
				setEditId(null);
			} else {
				await API.post("/students", form);
			}
			setForm({ name: "", email: "", course: "" });
			await fetchStudents();
			setError("");
		} catch (err) {
			console.error("Error saving student:", err);
			setError(err.response?.data?.message || "Error saving student");
		} finally {
			setLoading(false);
		}
	};

	const handleEdit = (student) => {
		setForm({
			name: student.name,
			email: student.email,
			course: student.course || "",
		});
		setEditId(student._id);
	};

	const handleCancelEdit = () => {
		setForm({ name: "", email: "", course: "" });
		setEditId(null);
	};

	const handleDelete = async (id) => {
		if (window.confirm("Are you sure you want to delete this student?")) {
			try {
				await API.delete(`/students/${id}`);
				await fetchStudents();
				setError("");
			} catch (err) {
				console.error("Error deleting student:", err);
				setError(err.response?.data?.message || "Error deleting student");
			}
		}
	};

	const handleLogout = () => {
		logout();
		navigate("/login");
	};

	return (
		<div className='dashboard'>
			<div className='dashboard-header'>
				<h2>Admin Dashboard</h2>
				<div className='user-info'>
					<span>Welcome, {user?.name || "Admin"}</span>
					<button onClick={handleLogout} className='logout-btn'>
						Logout
					</button>
				</div>
			</div>

			{error && <div className='error-message'>{error}</div>}

			<div className='form-section'>
				<h3>{editId ? "Edit Student" : "Add New Student"}</h3>
				<form onSubmit={handleSubmit} className='student-form'>
					<div className='form-row'>
						<input
							type='text'
							name='name'
							placeholder='Student Name'
							value={form.name}
							onChange={handleChange}
							required
							disabled={loading}
						/>
						<input
							type='email'
							name='email'
							placeholder='Email'
							value={form.email}
							onChange={handleChange}
							required
							disabled={loading}
						/>
						<input
							type='text'
							name='course'
							placeholder='Course'
							value={form.course}
							onChange={handleChange}
							disabled={loading}
						/>
					</div>
					<div className='form-buttons'>
						<button type='submit' disabled={loading}>
							{loading
								? "Saving..."
								: editId
								? "Update Student"
								: "Add Student"}
						</button>
						{editId && (
							<button
								type='button'
								onClick={handleCancelEdit}
								className='cancel-btn'
								disabled={loading}>
								Cancel
							</button>
						)}
					</div>
				</form>
			</div>

			<div className='students-section'>
				<h3>Students List ({students.length})</h3>
				{loading && <div className='loading'>Loading students...</div>}

				{students.length === 0 ? (
					<div className='no-data'>No students found</div>
				) : (
					<div className='students-list'>
						{students.map((student) => (
							<div key={student._id} className='student-card'>
								<div className='student-info'>
									<h4>{student.name}</h4>
									<p>Email: {student.email}</p>
									<p>Course: {student.course || "N/A"}</p>
									{student.enrollmentDate && (
										<p>
											Enrolled:{" "}
											{new Date(student.enrollmentDate).toLocaleDateString()}
										</p>
									)}
								</div>
								<div className='student-actions'>
									<button
										onClick={() => handleEdit(student)}
										className='edit-btn'
										disabled={loading}>
										Edit
									</button>
									<button
										onClick={() => handleDelete(student._id)}
										className='delete-btn'
										disabled={loading}>
										Delete
									</button>
								</div>
							</div>
						))}
					</div>
				)}
			</div>
		</div>
	);
}

export default AdminDashboard;
