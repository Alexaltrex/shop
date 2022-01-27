import {instance, IResponse} from "./api";
import {ICategory} from "../types/types";
import {authHeader} from "./authHeader";

export const categoryAPI = {
    getAll: async () => {
        const response = await instance.get<IResponse<ICategory[]>>('category')
        return response.data;
    },
    create: async (title: string) => {
        const response = await instance.post<IResponse>('category', {title}, {headers: authHeader()});
        return response.data;
    },
    update: async (id: string, title: string) => {
        const response = await instance.put<IResponse>('category', {id, title}, {headers: authHeader()});
        return response.data;
    },
    delete: async (id: string) => {
        const response = await instance.delete<IResponse>(`category/${id}`, {headers: authHeader()});
        return response.data;
    },
};