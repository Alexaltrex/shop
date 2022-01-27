import {LoginDataType} from "../api/auth.api";

export const setUserInfo = ({userId, login, token, role}: LoginDataType) => {
    localStorage.setItem('userInfo', JSON.stringify({userId, login, token, role}));
};
export const getUserInfo = (): null | LoginDataType => {
    const userInfo = localStorage.getItem('userInfo');
    if (userInfo) {
        const data = JSON.parse(userInfo);
        return ({...data})
    } else {
        return null
    }
};
export const removeUserInfo = () => {
    localStorage.removeItem('userInfo');
};

export const setToken = (token: string) => {
    localStorage.setItem('token', token);
};
export const getToken: GetTokenType = () => {
    const token = localStorage.getItem('token');
    if (token) {
        return token
    } else {
        return null;
    }
};
export const removeToken = () => {
    localStorage.removeItem('token');
};

export const setLogin = (login: string) => {
    localStorage.setItem('login', login);
};
export const getLogin: GetTokenType = () => {
    const login = localStorage.getItem('login');
    if (login) {
        return login
    } else {
        return null;
    }
};
export const removeLogin = () => {
    localStorage.removeItem('login');
};

type GetTokenType = () => null | string;