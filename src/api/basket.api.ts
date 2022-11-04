import {instance, IResponse} from "./api";
import {IAddProductBasket, IProductBasket} from "../types/types";
import {authHeader} from "./authHeader";

export const basketAPI = {
    getProducts: async () => {
        const response = await instance.get<IResponse<IProductBasket[]>>('basket', {headers: authHeader()})
        return response.data;
    },
    addProduct: async (productBasket: IAddProductBasket) => {
        const response = await instance.post<IResponse>('basket', {productBasket}, {headers: authHeader()});
        return response.data;
    },
    updateCount: async (productInBasketId: string, count: number) => {
        const response = await instance.put<IResponse>('basket', {productInBasketId, count}, {headers: authHeader()});
        return response.data;
    },
    deleteProduct: async (productInBasketId: string) => {
        const response = await instance.delete<IResponse>(`basket/${productInBasketId}`, {headers: authHeader()});
        return response.data;
    },
};