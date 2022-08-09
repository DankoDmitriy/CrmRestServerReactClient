import $api from "../http";

export const AUTH_URL = 'auth'
export const LOGIN_POINT = 'login'

export default class AuthService {
    static async login(loginData) {
        const response = $api.post(AUTH_URL + '/' + LOGIN_POINT, loginData)
        return response;
    }
}
