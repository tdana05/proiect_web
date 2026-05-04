import axios from 'axios';

const API_BASE_URL = 'https://localhost:7044/api';

const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Interceptor pentru gestionarea globală a erorilor
apiClient.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response) {
            switch (error.response.status) {
                case 400:
                    console.error('Bad Request:', error.response.data);
                    break;
                case 401:
                    console.error('Unauthorized - Te rugăm să te autentifici');
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