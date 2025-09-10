// Example: API.js axios setup
import axios from "axios";

const API = axios.create({
	baseURL: "http://localhost:5000/api", // or your API base
});

API.interceptors.request.use((config) => {
	const token = localStorage.getItem("token");
	if (token) config.headers.Authorization = `Bearer ${token}`;
	return config;
});

export default API;
