import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:5000/api/', // Set your base API URL here
});

axiosInstance.interceptors.request.use(
    (config) => {
        const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjZjNGEyZmY3YmM5ZmRhMDEzY2NiODA3Iiwicm9sZSI6ImNsZXJrIn0sImlhdCI6MTcyNDI2MzEzMiwiZXhwIjoxNzI0MjY2NzMyfQ.szIyWt2rSHBUTutjwwD5zgt7LokQgZ8y531sRH5hLe0"; // Assuming you store the token in localStorage
        if (token) {
            config.headers['x-auth-token'] = token;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default axiosInstance;