import {BaseThunkType, GetActionsType, StateType} from "../store";

//================ TYPE ==================
export type InitialStateType = typeof initialState;
export type AppActionsType = GetActionsType<typeof appAC>
type ThunkType = BaseThunkType<AppActionsType>

//================ INITIAL ==================
const initialState = {
    catalogOpen: false,
    loading: false
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
        default:
            return state;
    }
};

// ================ ACTION CREATORS =================
export const appAC = {
    setCatalogOpen: (catalogOpen: boolean) => ({type: 'SHOP/APP/SET_CATALOG_OPEN', catalogOpen} as const),
    setLoading: (loading: boolean) => ({type: 'SHOP/APP/SET_LOADING', loading} as const),
};

//================ THUNK CREATORS ==================

//============== SELECTORS =================
export const selectCatalogOpen = (state: StateType) => state.app.catalogOpen;
export const selectLoading = (state: StateType) => state.app.loading;
