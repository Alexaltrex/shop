import {instance, IResponse} from "./api";

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
    // поставить рейтинг товару
    async rating(productId: string, rating: number) {
        const response = await instance.post<IResponse>('auth/rating', {productId, rating});
        return response.data;
    }
};

export type LoginDataType = {
    token: string
    login: string
    userId: string
    role: 'user' | 'admin'
}