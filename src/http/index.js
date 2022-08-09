import axios from "axios";
import jwtDecode from "jwt-decode";

export const API_URL = 'http://localhost:8090/server/api/'


const $api = axios.create({
    baseURL: API_URL,
    responseType: "json"
})

$api.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer_${localStorage.getItem('token')}`
    return config;
})

$api.interceptors.response.use((config) => {
    return config;
}, async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 || error.response.status === 403 && (error.config && !error.config._isRetry)) {
        originalRequest._isRetry = true;
        localStorage.removeItem('isLogin')
        try {
            const response = await axios.get(API_URL + 'auth/refresh', {
                    headers: {
                        'Authorization': `Bearer_${localStorage.getItem('token')}`
                    },
                    params: {
                        refreshToken: localStorage.getItem("refreshToken")
                    }
                }
            )
            const decodeToken = jwtDecode(response.data.token);
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('refreshToken', response.data.refreshToken);
            localStorage.setItem('username', response.data.username);
            localStorage.setItem('userId', decodeToken.id);
            localStorage.setItem('roles', decodeToken.roles);
            localStorage.setItem('isLogin', 'true');
            return $api.request(originalRequest);
        } catch (e) {
            console.log('Access is denied')
        }
    }
    throw error;
})

export default $api;