import React, {useEffect} from "react";
import style from './productPage.module.scss';
import {Link, useSearchParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {
    categoryAC,
    getProductById,
    selectCurrentProduct,
    selectFilterParams
} from "../../../store/reducers/category.reducer";
import clsx from "clsx";
import {CategoryList} from "../CategoryList/CategoryList";
import {selectCatalogOpen} from "../../../store/reducers/app.reducer";
import {Preview} from "../../common/Preview/Preview";
import Button from "@mui/material/Button";
import {ProductRating} from "./ProductRating/ProductRating";

export const ProductPage = () => {
    let [searchParams, setSearchParams] = useSearchParams();
    const productId = searchParams.get('productId');
    const dispatch = useDispatch();
    const currentProduct = useSelector(selectCurrentProduct);
    const catalogOpen = useSelector(selectCatalogOpen);

    useEffect(() => {
        productId && dispatch(getProductById(productId));
    }, [productId]);

    const filterParams = useSelector(selectFilterParams);
    const onClickHandler = () => dispatch(categoryAC.setFilterParams({...filterParams, page: "1"}))

    return (
        <section className={style.productPage}>

            <div className={clsx({
                [style.categoryListWrapper]: true,
                [style.categoryListWrapper_show]: catalogOpen,
            })}>
                <CategoryList/>
            </div>

            {
                currentProduct && (
                    <>
                        <p>
                            <Link to='/' className={style.link}>Catalog</Link>
                            <span> / </span>
                            <Link to={`/products/category?categoryId=${currentProduct.category.id}`}
                                  className={style.link}
                                  onClick={onClickHandler}
                            >
                                {currentProduct.category.title}
                            </Link>
                        </p>

                        <div className={style.product}>
                            <div className={style.leftBlock}>
                                <Preview colors={currentProduct.colors} text={currentProduct.title}/>
                            </div>

                            <div className={style.rightBlock}>
                                <div className={style.info}>
                                    <h1 className={style.title}>{currentProduct.title}</h1>
                                    <p>{`price: ${currentProduct.price}  ₽`}</p>
                                    <p>{`available: ${currentProduct.available ? 'yes' : 'no'}`}</p>
                                    <p>{`available count: ${currentProduct.quantity}`}</p>
                                    <p>{`brand: ${currentProduct.brand}`}</p>
                                    <Button variant='contained' className={style.button}>Add to basket</Button>
                                    <Button variant='outlined' className={style.button}>Buy now</Button>
                                    <p>{`Description: ${currentProduct.description}`}</p>
                                    <p>{`weight: ${currentProduct.weight} kg`}</p>
                                </div>

                                <div className={style.rating}>
                                    <ProductRating rating={currentProduct.rating}
                                                   rate={currentProduct.rate}
                                    />
                                </div>

                            </div>




                        </div>

                    </>
                )
            }


        </section>
    )
};