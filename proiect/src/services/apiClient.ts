import axios, { AxiosInstance } from 'axios';

const API_BASE_URL = 'http://localhost:5044/api';

const apiClient: AxiosInstance = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Interceptor pentru a adăuga token-ul în fiecare request
apiClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('amicus_token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Interceptor pentru gestionarea globală a erorilor
apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response) {
            switch (error.response.status) {
                case 400:
                    console.error('Bad Request:', error.response.data);
                    break;
                case 401:
                    console.error('Unauthorized - Te rugăm să te autentifici');
                    localStorage.removeItem('amicus_token');
                    localStorage.removeItem('amicus_session');
                    window.location.href = '/login';
                    break;
                case 403:
                    console.error('Forbidden - Nu ai permisiunea necesară');
                    break;
                case 404:
                    console.error('Not Found:', error.response.data);
                    break;
                case 500:
                    console.error('Server Error:', error.response.data);
                    break;
                default:
                    console.error('Error:', error.response.data);
            }
        } else if (error.request) {
            console.error('No response received from server');
        } else {
            console.error('Error setting up request:', error.message);
        }
        return Promise.reject(error);
    }
);

export default apiClient;