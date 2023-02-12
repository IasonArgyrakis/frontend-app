import axios from 'axios';
import jwtDecode from 'jwt-decode';

export  const _axios = axios.create({
    baseURL: 'http://localhost:3333'
})
const access_token = 'super-secret';

export class User {

    id?: number
    firstName?: string
    lastName?: string
    afm?: string
    email?: string
    password?: string
    access_token?: string
}


export const login = async (user: User) => {
    const response = await _axios.post('/auth/signup', {...user}).then((response) => {
            localStorage.setItem(access_token, response.data.access_token);
            console.log(response);
        },
        (reason) => {
            console.log(reason);
        }
    );


};

export const register = async (user: User) => {
    const response = await _axios.post('/auth/signup', {...user}).then((response) => {
            localStorage.setItem(access_token, response.data.access_token);
            console.log(response);
        },
    );
};

export const logout = () => {
    localStorage.removeItem(access_token);
};

export const isLoggedIn = () => {
    const token = localStorage.getItem(access_token);
    if (!token) {
        return false;
    }

    const decodedToken: { exp: number } = jwtDecode(token);
    if (decodedToken.exp * 1000 < Date.now()) {
        localStorage.removeItem(access_token);
        return false;
    }
    return true;
};

export const getToken = () => {
    return localStorage.getItem(access_token);
};
