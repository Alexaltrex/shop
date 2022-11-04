import React, {useEffect, useState} from "react";
import style from './productPage.module.scss';
import {Link, useNavigate, useSearchParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {
    categoryAC,
    getProductById,
    selectCurrentProduct,
    selectFilterParams
} from "../../../store/reducers/category.reducer";
import clsx from "clsx";
import {CategoryList} from "../CategoryList/CategoryList";
import {selectCatalogOpen, selectLang} from "../../../store/reducers/app.reducer";
import {Preview} from "../../common/Preview/Preview";
import Button from "@mui/material/Button";
import {ProductRating} from "./ProductRating/ProductRating";
import {ProductTabs} from "./ProductTabs/ProductTabs";
import {addProduct} from "../../../store/reducers/busket.reducer";
import {CategoryListWrapper} from "../CategoryList/CategoryListWrapper";
import {translate} from "../../../types/lang";

export const ProductPage = () => {
    let [searchParams, setSearchParams] = useSearchParams();
    const productId = searchParams.get('productId');
    const dispatch = useDispatch();
    const currentProduct = useSelector(selectCurrentProduct);

    const [selectedColor, setSelectedColor] = useState<string | null>(null);

    useEffect(() => {
        if (currentProduct) {
            setSelectedColor(currentProduct.colors[0]);
        }
    }, [currentProduct])

    useEffect(() => {
        productId && dispatch(getProductById(productId));
    }, [productId]);

    const filterParams = useSelector(selectFilterParams);
    const onLinkClickHandler = () => dispatch(categoryAC.setFilterParams({...filterParams, page: "1"}))

    const onAddToBasketHandler = () => {
        if (currentProduct && selectedColor) {
            dispatch(addProduct(
                {
                    ...currentProduct,
                    selectedColor: selectedColor,
                    quantityInBasket: 1,
                },
                true
            ))
        }
    }
    let navigate = useNavigate();
    const onBuyNowHandler = () => {
        if (currentProduct && selectedColor) {
            dispatch(addProduct({
                ...currentProduct,
                selectedColor,
                quantityInBasket: 1
            }));
            navigate("/basket");
        }
    }
    const lang = useSelector(selectLang);

    return (
        <section className={style.productPage}>

            <CategoryListWrapper/>

            {
                currentProduct && (
                    <>
                        <p>
                            <Link to='/' className={style.link}>Catalog</Link>
                            <span> / </span>
                            <Link to={`/products/category?categoryId=${currentProduct.category.id}`}
                                  className={style.link}
                                  onClick={onLinkClickHandler}
                            >
                                {currentProduct.category.title}
                            </Link>
                        </p>

                        <div className={style.product}>
                            <div className={style.leftBlock}>
                                {
                                    selectedColor &&
                                    <Preview colors={currentProduct.colors}
                                             text={currentProduct.title}
                                             selectedColor={selectedColor}
                                             onSelectHandler={(color: string) => setSelectedColor(color)}

                                    />
                                }
                            </div>

                            <div className={style.rightBlock}>
                                <div className={style.info}>
                                    <h1 className={style.title}>{currentProduct.title}</h1>
                                    <p>{`${translate("price", lang)}: ${currentProduct.price}  ₽`}</p>
                                    <p>
                                        {`${translate("available", lang)}: ${currentProduct.available ? translate("yes", lang) : translate("no", lang)}`}
                                    </p>
                                    <p>{`${translate("available count", lang)}: ${currentProduct.quantity}`}</p>
                                    <p>{`${translate("brand", lang)}: ${currentProduct.brand}`}</p>
                                    <Button variant='contained'
                                            className={style.button}
                                            onClick={onAddToBasketHandler}
                                    >
                                        {translate("Add to basket", lang)}
                                    </Button>
                                    <Button variant='contained'
                                            color="success"
                                            className={style.button}

                                            onClick={onBuyNowHandler}
                                    >
                                        {translate("Buy now", lang)}
                                    </Button>
                                </div>

                                <div className={style.tabs}>
                                    <ProductTabs/>
                                </div>

                            </div>
                        </div>
                    </>
                )
            }
        </section>
    )
};