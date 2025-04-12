// the axios instance can be used throughout the application

import axios from "axios";  // popular js lib used for making http requests 

export const axiosInstance = axios.create({
    baseURL: import.meta.env.MODE === "development" ? "http://localhost:3000/api" : "/api",
    withCredentials: true,   // Sends cookies and authentication credentials
    headers: {
        "Content-Type": "application/json"
    }
});