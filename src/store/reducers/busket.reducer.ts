import {BaseThunkType, GetActionsType, StateType} from "../store";
import {IAddProductBasket, IProductBasket} from "../../types/types";
import {basketAPI} from "../../api/basket.api";
import {appAC, AppActionsType} from "./app.reducer";

//================ TYPE ==================
export type InitialStateType = typeof initialState;
export type BasketActionsType = GetActionsType<typeof basketAC>
type ThunkType = BaseThunkType<BasketActionsType | AppActionsType>

//================ INITIAL ==================
const initialState = {
    isLoading: false,
    productsBasket: [] as IProductBasket[],
};

//================ REDUCER ===================
export const basketReducer = (state = initialState, action: BasketActionsType): InitialStateType => {
    switch (action.type) {
        case 'SHOP/BASKET/SET_IS_LOADING': {
            return {...state, isLoading: action.isLoading}
        }
        case 'SHOP/BASKET/SET_PRODUCTS_BASKET': {
            return {...state, productsBasket: action.productsBasket}
        }

        default:
            return state;
    }
};

// ================ ACTION CREATORS =================
export const basketAC = {
    setIsLoading: (isLoading: boolean) => ({type: 'SHOP/BASKET/SET_IS_LOADING', isLoading} as const),
    setProductsBasket: (productsBasket: IProductBasket[]) => ({type: 'SHOP/BASKET/SET_PRODUCTS_BASKET', productsBasket} as const),
};

//================ THUNK CREATORS ==================
export const getProductsBasket = (): ThunkType => async (dispatch) => {
    try {
        dispatch(basketAC.setIsLoading(true));
        const response = await basketAPI.getProducts();
        dispatch(basketAC.setProductsBasket(response.data));

    } catch (e: any) {
        console.error(e.message);
        console.error(e.stack);
    } finally {
        dispatch(basketAC.setIsLoading(false));
    }
};

export const addProduct = (productBasket: IAddProductBasket, showInfoPopup = false): ThunkType => async (dispatch) => {
    try {
        dispatch(basketAC.setIsLoading(true));
        await basketAPI.addProduct(productBasket);
        await dispatch(getProductsBasket());
        if (showInfoPopup) {
            dispatch(appAC.showInfoPopup({type: "success", text: "Product successfully added to basket"}))
        }
    } catch (e: any) {
        if (e.response.data.message === 'Maximum product count') {
            dispatch(appAC.showInfoPopup({type: "error", text: e.response.data.message}))
        }
        console.error(e.message);
        console.error(e.stack);
    } finally {
        dispatch(basketAC.setIsLoading(false));
    }
};

export const updateCount = (productInBasketId: string, count: number): ThunkType => async (dispatch) => {
    try {
        dispatch(basketAC.setIsLoading(true));
        await basketAPI.updateCount(productInBasketId, count);
        await dispatch(getProductsBasket());
    } catch (e: any) {
        console.error(e.message);
        console.error(e.stack);
    } finally {
        dispatch(basketAC.setIsLoading(false));
    }
};

export const deleteProduct = (productInBasketId: string): ThunkType => async (dispatch) => {
    try {
        dispatch(basketAC.setIsLoading(true));
        await basketAPI.deleteProduct(productInBasketId);
        await dispatch(getProductsBasket());
    } catch (e: any) {
        console.error(e.message);
        console.error(e.stack);
    } finally {
        dispatch(basketAC.setIsLoading(false));
    }
};

//============== SELECTORS =================
export const selectIsLoading = (state: StateType) => state.basket.isLoading;
export const selectProductsBasket = (state: StateType) => state.basket.productsBasket;


