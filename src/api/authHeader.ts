import {getUserInfo} from "../localStorage/localStorage";
import {AxiosRequestHeaders} from "axios";

export const authHeader = () => {
    const userInfo = getUserInfo();

    if (userInfo) {
        return {
            'x-access-token': userInfo.token
        } as AxiosRequestHeaders;
    } else {
        return {} as AxiosRequestHeaders
    }
};