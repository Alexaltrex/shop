import {BaseThunkType, GetActionsType, StateType} from "../store";
import {ICategory, IFilterParams, IMinMaxPrice, IProduct} from "../../types/types";
import {categoryAPI} from "../../api/category.api";
import {productAPI} from "../../api/product.api";
import {brandAPI} from "../../api/brand.api";

//================ TYPE ==================
export type InitialStateType = typeof initialState;
export type CategoryActionsType = GetActionsType<typeof categoryAC>
type ThunkType = BaseThunkType<CategoryActionsType>

//================ INITIAL ==================
const initialState = {
    isLoading: false,
    categoriesLoading: false,
    categories: null as null | ICategory[],
    selectedCategory: null as null | ICategory,
    products: null as null | IProduct[],
    currentProduct: null as null | IProduct,
    pageCount: 1,
    brands: null as null | string[],
    filterParams: {
        sort: 'default',
        query: null,
        categoryId: null,
        available: 'all',
        brands: [],
        colors: [],
        page: '1',
        priceMin: null,
        priceMax: null,
    } as IFilterParams,
    priceMinLocal: 1 as number | string | Array<number | string>, // их изменение не вызывает напрямую запрос к апи
    priceMaxLocal: 100 as number | string | Array<number | string> // при mouseUp измениет filterParams.priceMin, изменение которого вызывает запрос к апи
};

//================ REDUCER ===================
export const categoryReducer = (state = initialState, action: CategoryActionsType): InitialStateType => {
    switch (action.type) {
        case 'SHOP/CATEGORY/SET_IS_LOADING': {
            return {...state, isLoading: action.isLoading}
        }
        case 'SHOP/CATEGORY/SET_CATEGORIES_LOADING': {
            return {...state, categoriesLoading: action.categoriesLoading}
        }
        case 'SHOP/CATEGORY/SET_CATEGORIES': {
            return {...state, categories: action.categories}
        }
        case 'SHOP/CATEGORY/SET_SELECTED_CATEGORY': {
            return {...state, selectedCategory: action.selectedCategory}
        }
        case 'SHOP/CATEGORY/SET_PRODUCTS': {
            return {...state, products: action.products}
        }
        case 'SHOP/CATEGORY/SET_PAGE_COUNT': {
            return {...state, pageCount: action.pageCount}
        }
        case 'SHOP/CATEGORY/SET_CURRENT_PRODUCT': {
            return {...state, currentProduct: action.currentProduct}
        }
        case 'SHOP/CATEGORY/SET_BRANDS': {
            return {...state, brands: action.brands}
        }
        case 'SHOP/CATEGORY/SET_FILTER_PARAMS': {
            return {...state, filterParams: action.filterParams}
        }
        case 'SHOP/CATEGORY/RESET_FILTER_PARAMS': {
            return {...state, filterParams: {
                    sort: 'default',
                    query: null,
                    categoryId: null,
                    available: 'all',
                    brands: [],
                    colors: [],
                    page: '1',
                    priceMin: null,
                    priceMax: null,
                }}
        }
        case 'SHOP/CATEGORY/SET_PRICE_MIN_LOCAL': {
            return {...state, priceMinLocal: action.priceMinLocal}
        }
        case 'SHOP/CATEGORY/SET_PRICE_MAX_LOCAL': {
            return {...state, priceMaxLocal: action.priceMaxLocal}
        }
        default:
            return state;
    }
};

// ================ ACTION CREATORS =================
export const categoryAC = {
    setIsLoading: (isLoading: boolean) => ({type: 'SHOP/CATEGORY/SET_IS_LOADING', isLoading} as const),
    setCategoriesLoading: (categoriesLoading: boolean) => ({type: 'SHOP/CATEGORY/SET_CATEGORIES_LOADING', categoriesLoading} as const),
    setCategories: (categories: ICategory[]) => ({type: 'SHOP/CATEGORY/SET_CATEGORIES', categories} as const),
    setSelectedCategory: (selectedCategory: ICategory) => ({type: 'SHOP/CATEGORY/SET_SELECTED_CATEGORY', selectedCategory} as const),
    setProducts: (products: IProduct[]) => ({type: 'SHOP/CATEGORY/SET_PRODUCTS', products} as const),
    setPageCount: (pageCount: number) => ({type: 'SHOP/CATEGORY/SET_PAGE_COUNT', pageCount} as const),
    setCurrentProduct: (currentProduct: IProduct) => ({type: 'SHOP/CATEGORY/SET_CURRENT_PRODUCT', currentProduct} as const),
    setBrands: (brands: string[]) => ({type: 'SHOP/CATEGORY/SET_BRANDS', brands} as const),
    setFilterParams: (filterParams: IFilterParams) => ({type: 'SHOP/CATEGORY/SET_FILTER_PARAMS', filterParams} as const),
    resetFilterParams: () => ({type: 'SHOP/CATEGORY/RESET_FILTER_PARAMS'} as const),
    setPriceMinLocal: (priceMinLocal: number | string | Array<number | string>) => ({type: 'SHOP/CATEGORY/SET_PRICE_MIN_LOCAL', priceMinLocal} as const),
    setPriceMaxLocal: (priceMaxLocal: number | string | Array<number | string>) => ({type: 'SHOP/CATEGORY/SET_PRICE_MAX_LOCAL', priceMaxLocal} as const),
};

//================ THUNK CREATORS ==================
export const addCategory = (title: string): ThunkType => async (dispatch) => {
    try {
        dispatch(categoryAC.setIsLoading(true));
        await categoryAPI.create(title);
        dispatch(getCategories());
    } catch (e: any) {
        console.error(e.message);
        console.error(e.stack);
    } finally {
        dispatch(categoryAC.setIsLoading(false));
    }
};

export const getCategories = (): ThunkType => async (dispatch) => {
    try {
        dispatch(categoryAC.setCategoriesLoading(true));
        const response = await categoryAPI.getAll();
        dispatch(categoryAC.setCategories(response.data));
    } catch (e: any) {
        console.error(e.message);
        console.error(e.stack);
    } finally {
        dispatch(categoryAC.setCategoriesLoading(false));
    }
};

export const getProducts = (filterParams: IFilterParams): ThunkType => async (dispatch) => {
    try {
        dispatch(categoryAC.setIsLoading(true));
        const response = await productAPI.getProducts(filterParams);
        dispatch(categoryAC.setProducts(response.data.products));
        dispatch(categoryAC.setPageCount(response.data.pageCount));
    } catch (e: any) {
        console.error(e.message);
        console.error(e.stack);
    } finally {
        dispatch(categoryAC.setIsLoading(false));
    }
};

export const getProductsByCategoryId = (categoryId: string): ThunkType => async (dispatch) => {
    try {
        dispatch(categoryAC.setIsLoading(true));
        const response = await productAPI.getByCategoryId(categoryId);
        dispatch(categoryAC.setProducts(response.data));
    } catch (e: any) {
        console.error(e.message);
        console.error(e.stack);
    } finally {
        dispatch(categoryAC.setIsLoading(false));
    }
};

export const getProductById = (productId: string): ThunkType => async (dispatch) => {
    try {
        dispatch(categoryAC.setIsLoading(true));
        const response = await productAPI.getProductById(productId);
        dispatch(categoryAC.setCurrentProduct(response.data));
    } catch (e: any) {
        console.error(e.message);
        console.error(e.stack);
    } finally {
        dispatch(categoryAC.setIsLoading(false));
    }
};

export const getBrands = (): ThunkType => async (dispatch) => {
    try {
        dispatch(categoryAC.setIsLoading(true));
        const response = await brandAPI.getAll();
        dispatch(categoryAC.setBrands(response.data));
    } catch (e: any) {
        console.error(e.message);
        console.error(e.stack);
    } finally {
        dispatch(categoryAC.setIsLoading(false));
    }
};

//============== SELECTORS =================
export const selectIsLoading = (state: StateType) => state.category.isLoading;
export const selectCategoriesLoading = (state: StateType) => state.category.categoriesLoading;
export const selectCategories = (state: StateType) => state.category.categories;
export const selectSelectedCategory = (state: StateType) => state.category.selectedCategory;
export const selectProducts = (state: StateType) => state.category.products;
export const selectPageCount = (state: StateType) => state.category.pageCount;
export const selectCurrentProduct = (state: StateType) => state.category.currentProduct;
export const selectBrands = (state: StateType) => state.category.brands;
export const selectFilterParams = (state: StateType) => state.category.filterParams;
export const selectPriceMinLocal = (state: StateType) => state.category.priceMinLocal;
export const selectPriceMaxLocal = (state: StateType) => state.category.priceMaxLocal;
