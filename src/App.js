// import { Routes, Route, Navigate } from "react-router-dom";
// import { AuthProvider } from "./context/AuthContext";
// import ProtectedRoute from "./components/ProtectedRoute";
// import Login from "./pages/Login";
// import Signup from "./pages/Signup";
// import AdminDashboard from "./pages/AdminDashboard";
// import StudentDashboard from "./pages/StudentDashboard";
// import "./App.css";

// function App() {
// 	return (
// 		<AuthProvider>
// 			<div className='App'>
// 				<Routes>
// 					<Route path='/login' element={<Login />} />
// 					<Route path='/signup' element={<Signup />} />
// 					<Route
// 						path='/admin-dashboard'
// 						element={
// 							<ProtectedRoute requiredRole='admin'>
// 								<AdminDashboard />
// 							</ProtectedRoute>
// 						}
// 					/>
// 					<Route
// 						path='/student-dashboard'
// 						element={
// 							<ProtectedRoute requiredRole='student'>
// 								<StudentDashboard />
// 							</ProtectedRoute>
// 						}
// 					/>
// 					<Route path='/' element={<Navigate to='/login' replace />} />
// 				</Routes>
// 			</div>
// 		</AuthProvider>
// 	);
// }

// export default App;
// src/App.js
import { Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import AdminDashboard from "./pages/AdminDashboard";
import StudentDashboard from "./pages/StudentDashboard";
import "./App.css";

function App() {
	return (
		<AuthProvider>
			<div className='App'>
				<Routes>
					<Route path='/login' element={<Login />} />
					<Route path='/signup' element={<Signup />} />
					<Route path='/admin-dashboard' element={<AdminDashboard />} />
					<Route
						path='/student-dashboard'
						element={
							<ProtectedRoute requiredRole='student'>
								<StudentDashboard />
							</ProtectedRoute>
						}
					/>
					<Route path='/' element={<Navigate to='/login' replace />} />
				</Routes>
			</div>
		</AuthProvider>
	);
}

export default App;
