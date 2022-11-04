import {BaseThunkType, GetActionsType, StateType} from "../store";
import {IInfoPopup} from "../../types/types";
import {AlertColor} from "@mui/material";
import {categoryAPI} from "../../api/category.api";
import {categoryAC, getCategories} from "./category.reducer";
import {authAPI} from "../../api/auth.api";

//================ TYPE ==================
export type InitialStateType = typeof initialState;
export type AuthActionsType = GetActionsType<typeof authAC>
type ThunkType = BaseThunkType<AuthActionsType>

//================ INITIAL ==================
const initialState = {
    loading: false,
    nickName: "",
};

//================ REDUCER ===================
export const authReducer = (state = initialState, action: AuthActionsType): InitialStateType => {
    switch (action.type) {
        case 'SHOP/AUTH/SET_LOADING': {
            return {...state, loading: action.loading}
        }
        case 'SHOP/AUTH/SET_NICKNAME': {
            return {...state, nickName: action.nickName}
        }
        default:
            return state;
    }
};

// ================ ACTION CREATORS =================
export const authAC = {
    setLoading: (loading: boolean) => ({type: 'SHOP/AUTH/SET_LOADING', loading} as const),
    setNickName: (nickName: string) => ({type: 'SHOP/AUTH/SET_NICKNAME', nickName} as const),
};

//================ THUNK CREATORS ==================
export const getNickName = (): ThunkType => async (dispatch) => {
    try {
        dispatch(authAC.setLoading(true));
        const response = await authAPI.getNickName();
        dispatch(authAC.setNickName(response.data));
    } catch (e: any) {
        console.error(e.message);
        console.error(e.stack);
    } finally {
        dispatch(authAC.setLoading(false));
    }
};

export const changeNickName = (nickName: string): ThunkType => async (dispatch) => {
    try {
        dispatch(authAC.setLoading(true));
        await authAPI.changeNickName(nickName);
        await dispatch(getNickName());
    } catch (e: any) {
        console.error(e.message);
        console.error(e.stack);
    } finally {
        dispatch(authAC.setLoading(false));
    }
};

//============== SELECTORS =================
export const selectLoading = (state: StateType) => state.auth.loading;
export const selectNickName = (state: StateType) => state.auth.nickName;
