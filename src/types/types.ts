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
    rating: RatingType,
    rate: string
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