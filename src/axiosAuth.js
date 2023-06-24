import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { getConfig } from './services/config';
import { history } from './App';

export const axiosAuth = axios.create();
axiosAuth.defaults.withCredentials = true;
axiosAuth.interceptors.request.use((request) => {
    const url = process.env.REACT_APP_API_BASE_URL;
    request.baseURL = url;
    request.headers.Authorization = getConfig().headers.Authorization;

    return request;
});
axiosAuth.interceptors.response.use(
    (response) => {
        // Any status code that lie within the range of 2xx cause this function to trigger
        return response.data;
    },
    (err) => {
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        const status = err.response?.status || 500;
        console.log('err.response', err);
        // we can handle global errors here
        switch (status) {
            // authentication (token related issues)
            case 401: {
                //Need to assign new jwt_token from refresh_token
                //...
                console.error('Unauthenticated');
                history.push('/login');

                return Promise.reject({ message: err.message, statusCode: 401 });
            }

            // forbidden (permission related issues)
            case 403: {
                console.error('Forbidden');
                history.push('/forbidden');
                return Promise.reject({ message: err.message, statusCode: 403 });
            }

            // bad request
            case 400: {
                return Promise.reject({ message: err.message, statusCode: 400 });
            }

            // not found
            case 404: {
                return Promise.reject({ message: err.response.data.message || err.message, statusCode: 404 });
            }
            // not found
            case 406: {
                return Promise.reject({ message: err.response.data.message, statusCode: 406 });
            }

            // conflict
            case 409: {
                return Promise.reject({ message: err.message, statusCode: 409 });
            }

            // unprocessable
            case 422: {
                return Promise.reject({ message: err.message, statusCode: 422 });
            }

            // generic api error (server related) unexpected
            default: {
                return Promise.reject({ message: err.message, statusCode: 500 });
            }
        }
    },
);
