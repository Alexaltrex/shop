import axios from "axios";

export const instance = axios.create({
    baseURL: process.env.NODE_ENV === 'development'
        ? 'http://localhost:4444/shop/'
        : 'https://alexaltrex-common-api.herokuapp.com/shop/'
});

export interface IResponse<D = {}> {
    status: 'ok' | 'error'
    data: D
    message: string
    error?: {
        field: string
        value: string
    }
}
