import React, {FC, useEffect} from "react";
import style from './productsOfCategory.module.scss';
import {ICategory} from "../../../../../types/types";
import {useDispatch, useSelector} from "react-redux";
import {getProductsByCategoryId, selectProducts} from "../../../../../store/reducers/category.reducer";
import {ProductItem} from "../ProductItem/ProductItem";
import {AddProduct} from "../AddProduct/AddProduct";

interface IProductsOfCategory {
    category: ICategory
    show: boolean
}

export const ProductsOfCategory: FC<IProductsOfCategory> = ({category, show}) => {
    const dispatch = useDispatch();
    useEffect(() => {
        if (show) {
            dispatch(getProductsByCategoryId(category.id));
        }
    }, [show]);
    const products = useSelector(selectProducts);

    return (
        <div className={style.productsOfCategory}>
            <div>
                {
                    products && products.map(product => <ProductItem key={product.id} product={product}/>)
                }
            </div>
            <AddProduct categoryId={category.id}/>
        </div>
    )
}