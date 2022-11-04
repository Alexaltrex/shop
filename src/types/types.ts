import {AlertColor} from "@mui/material";

export interface IProduct {
    id: string
    title: string
    category: {
        id: string
        title: string
    }
    article: string
    available: boolean
    quantity: number
    description: string
    price: number
    weight: number
    colors: string[]
    brand: string
    rating: RatingType
    rate: string
    reviews: IReview[]
}

export interface IProductBasket extends IProduct {
    productInBasketId: string
    selectedColor: string
    quantityInBasket: number
}

export type IAddProductBasket = Omit<IProductBasket, "productInBasketId">

export interface IReview {
    id: string
    rating: number
    userName: string
    review: string,
    date: Date
}

export type RatingType = {
    "1": number
    "2": number
    "3": number
    "4": number
    "5": number
}

export interface ICategory {
    id: string
    title: string
}

export interface IMinMaxPrice {
    priceMin: number
    priceMax: number
}

export type SortType = 'default' | 'priceUp' | 'priceDown' | 'ratingUp' | 'ratingDown'

export interface IFilterParams {
    sort: SortType
    query: null | string
    categoryId: null | string
    available: string
    brands: string[]
    page: string
    colors: string[]
    priceMin: null | string
    priceMax: null | string
}

export interface IRatedProducts {
    [key: string]: string
}

export interface IInfoPopup {
    show: boolean
    text: string
    type: AlertColor
}

export type LangType = 'ENG' | 'RUS';