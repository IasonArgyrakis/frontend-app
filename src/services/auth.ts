import jwtDecode from 'jwt-decode';
import {backend} from "./data.service";


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

    const response = await backend.post({
        url: '/auth/signup',
        payload: {...user},
    })


};

export const register = async (user: User) => {

    const response = await backend.post({
        url: '/auth/signup',
        payload: {...user},
    })
    console.log(response)


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
