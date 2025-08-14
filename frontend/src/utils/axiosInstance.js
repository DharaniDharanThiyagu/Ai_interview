import axios from 'axios';
import { BASE_URL } from './apiPaths';

const axiosInstance = axios.create({
    baseURL: BASE_URL,
timeout: 80000,
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    },
});
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// reponse Interceptor
axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response && error.response.status === 401) {
            // Handle unauthorized access, e.g., redirect to login
            window.location.href = '/';
            console.error('Unauthorized access - redirecting to login');
            // Optionally, you can redirect to a login page here
        }
        else if (error.response && error.response.status === 500) {
            console.log('Server error occurred:', error.response.data.message);
        }
        else if (error.code=='ECONNABORTED') {
            
            console.error('Request timed out:', error.message);
        }
            // Handle 
        return Promise.reject(error);
    }
);
export default axiosInstance;