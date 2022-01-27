import {instance, IResponse} from "./api";

export const brandAPI = {
    getAll: async () => {
        const response = await instance.get<IResponse<string[]>>('brand')
        return response.data;
    },
};