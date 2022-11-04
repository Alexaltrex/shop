import {BaseThunkType, GetActionsType, StateType} from "../store";
import {IInfoPopup, LangType} from "../../types/types";
import {AlertColor} from "@mui/material";

//================ TYPE ==================
export type InitialStateType = typeof initialState;
export type AppActionsType = GetActionsType<typeof appAC>
type ThunkType = BaseThunkType<AppActionsType>

//================ INITIAL ==================
const initialState = {
    catalogOpen: false,
    loading: false,
    infoPopup: {
        show: false,
        type: "success" as AlertColor,
        text: '',
    },
    lang: 'ENG' as LangType,
};

//================ REDUCER ===================
export const appReducer = (state = initialState, action: AppActionsType): InitialStateType => {
    switch (action.type) {
        case 'SHOP/APP/SET_CATALOG_OPEN': {
            return {...state, catalogOpen: action.catalogOpen}
        }
        case 'SHOP/APP/SET_LOADING': {
            return {...state, loading: action.loading}
        }
        case 'SHOP/APP/SET_INFO_POPUP': {
            return {...state, infoPopup: {...action.infoPopup, show: true}}
        }
        case 'SHOP/APP/CLOSE_INFO_POPUP': {
            return {...state, infoPopup: {...state.infoPopup, show: false}}
        }
        case 'SHOP/APP/SET_LANG': {
            return {...state, lang: action.lang}
        }
        default:
            return state;
    }
};

// ================ ACTION CREATORS =================
export const appAC = {
    setCatalogOpen: (catalogOpen: boolean) => ({type: 'SHOP/APP/SET_CATALOG_OPEN', catalogOpen} as const),
    setLoading: (loading: boolean) => ({type: 'SHOP/APP/SET_LOADING', loading} as const),
    showInfoPopup: (infoPopup: {type: AlertColor, text: string}) => ({type: 'SHOP/APP/SET_INFO_POPUP', infoPopup} as const),
    closeInfoPopup: () => ({type: 'SHOP/APP/CLOSE_INFO_POPUP'} as const),
    setLang: (lang: LangType) => ({type: 'SHOP/APP/SET_LANG', lang} as const),
};

//================ THUNK CREATORS ==================

//============== SELECTORS =================
export const selectCatalogOpen = (state: StateType) => state.app.catalogOpen;
export const selectLoading = (state: StateType) => state.app.loading;
export const selectInfoPopup = (state: StateType) => state.app.infoPopup;
export const selectLang = (state: StateType) => state.app.lang;
