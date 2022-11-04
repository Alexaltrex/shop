import React, {useEffect} from "react";
import {getUserInfo} from "../../../localStorage/localStorage";
import {Navigate} from "react-router-dom";
import style from "./basketPage.module.scss";
import Divider from "@mui/material/Divider";
import {useDispatch, useSelector} from "react-redux";
import {getProductsBasket, selectProductsBasket} from "../../../store/reducers/busket.reducer";
import {ProductItem} from "./ProductItem/ProductItem";
import clsx from "clsx";
import {NotFoundResult} from "../../common/NotFondResult/NotFoundResult";
import {CategoryListWrapper} from "../CategoryList/CategoryListWrapper";
import {selectLang} from "../../../store/reducers/app.reducer";
import {translate} from "../../../types/lang";

export const BasketPage = () => {
    const userInfo = getUserInfo();
    const productsBasket = useSelector(selectProductsBasket);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getProductsBasket());
    }, [dispatch]);

    const total = productsBasket.reduce(
        (prev, curr) => prev + curr.quantityInBasket * curr.price, 0
    );
    const lang = useSelector(selectLang);

    if (!userInfo || (userInfo && userInfo.role !== 'user')) {
        return <Navigate to="/login"/>
    }

    return (
        <section className={style.basketPage}>
            <CategoryListWrapper/>
            <div className={clsx(style.productsBlock, style.border)}>
                <h2>{translate("Basket", lang)}</h2>
                <Divider sx={{margin: "10px 0"}}/>
                <div className={style.products}>
                    {
                        productsBasket.length !== 0
                            ? productsBasket.map(productBasket => <ProductItem key={productBasket.productInBasketId}
                                                                               productBasket={productBasket}
                            />)
                            : <NotFoundResult text="Basket is empty"/>
                    }
                </div>
            </div>

            <div className={clsx(style.infoBlock, style.border)}>
                <p>{`${translate("Total", lang)}:`}</p>
                <p>{`${total} ₽`}</p>
            </div>

        </section>
    )
}