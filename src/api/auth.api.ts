import {instance, IResponse} from "./api";
import {authHeader} from "./authHeader";

export const authAPI = {
    // регистрация
    async registration(login: string, email: string, password: string) {
        const response = await instance.post<IResponse>('auth/register', {login, email, password});
        return response.data;
    },
    // логинизация
    async login(email: string, password: string) {
        const response = await instance.post<IResponse<LoginDataType>>('auth/login', {email, password});
        return response.data;
    },
    // изменение пароля
    async changePassword(oldPassword: string, newPassword: string) {
        const response = await instance.post<IResponse<LoginDataType>>(
            'auth/password',
            {oldPassword, newPassword},
            {headers: authHeader()},
        );
        return response.data;
    },
    // получить nickName
    async getNickName() {
        const response = await instance.get<IResponse<string>>(
            'auth/nickname',
            {headers: authHeader()},
        );
        return response.data;
    },
    // изменить nickName
    async changeNickName(nickName: string) {
        const response = await instance.put<IResponse<IResponse>>(
            'auth/nickname',
            {nickName},
            {headers: authHeader()},
        );
        return response.data;
    },
};

export type LoginDataType = {
    token: string
    login: string
    userId: string
    email: string
    role: 'user' | 'admin'
}