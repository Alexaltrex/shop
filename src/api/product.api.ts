import {instance, IResponse} from "./api";
import {IFilterParams, IMinMaxPrice, IProduct} from "../types/types";
import {authHeader} from "./authHeader";

interface IGetProducts {
    products: IProduct[]
    pageCount: number
}

export interface IProductUpdateRequest {
    available: boolean
    brand: string
    colors: string[]
    description: string
    price: number
    quantity: number
    title: string
    weight: number
}

export const productAPI = {
    getByCategoryId: async (categoryId: string) => {
        const response = await instance.get<IResponse<IProduct[]>>(`product/category/${categoryId}`);
        return response.data;
    },
    getProductById: async (productId: string) => {
        const response = await instance.get<IResponse<IProduct>>(`product/id/${productId}`);
        return response.data;
    },
    update: async (id: string, update: IProductUpdateRequest) => {
        const response = await instance.put<IResponse>('product', {id, update},  {headers: authHeader()});
        return response.data;
    },
    create: async (categoryId: string, update: IProductUpdateRequest) => {
        const response = await instance.post<IResponse>('product', {categoryId, update},  {headers: authHeader()});
        return response.data;
    },
    delete: async (id: string) => {
        const response = await instance.delete<IResponse>(`product/id/${id}`, {headers: authHeader()});
        return response.data;
    },
    getMinMaxPrice: async () => {
        const response = await instance.get<IResponse<IMinMaxPrice>>(`product/price`);
        return response.data;
    },
    getProducts: async (filterParams: IFilterParams) => {
        const {categoryId, available, brands, page, colors, priceMin, priceMax} = filterParams;
        // query: null |string,
        // categoryId: null | string
        // available: null | string
        // brand: null | string
        // page: null | string
        // colors: null | string
        // priceMin: null | string
        // priceMax: null | string

        let url = 'product';
        url = `${url}?page=${page ? page : '1'}`;

        if (colors.length !== 0) {
            const colorsWithoutHash = colors.map(color => color.slice(1)).join(',');
            url = `${url}&colors=${colorsWithoutHash}`;
        }

        if (brands.length !== 0) {
            url = `${url}&brands=${filterParams.brands.join(',')}`;
        }

        Object.keys(filterParams).forEach(key => {
            // @ts-ignore
            if (filterParams[key] && key !== 'page' && key !== 'colors' && key !== 'brands') {
                // @ts-ignore
                url = `${url}&${key}=${filterParams[key]}`;
            }
        });
        const response = await instance.get<IResponse<IGetProducts>>(url);
        return response.data;
    },
    // оставить отзыв для товара
    async reviewProduct(productId: string, rating: number, review: string) {
        const response = await instance.post<IResponse>('product/review', {productId, rating, review}, {headers: authHeader()});
        return response.data;
    },
    // получить список товаров, которым юзер поставил рейтинг
    async getRatedProducts() {
        const response = await instance.get<IResponse>('product/review', {headers: authHeader()});
        return response.data;
    }
};