import React, {FC, useState} from "react";
import {Preview} from "../../common/Preview/Preview";
import {Link, useNavigate} from "react-router-dom";
import Button from "@mui/material/Button";
import {IProduct} from "../../../types/types";
import style from './productCard.module.scss';
import {Rating} from "@mui/material";
import Chip from "@mui/material/Chip";
import {useDispatch, useSelector} from "react-redux";
import {addProduct} from "../../../store/reducers/busket.reducer";
import {selectLang} from "../../../store/reducers/app.reducer";
import {translate} from "../../../types/lang";

interface IProductCard {
    product: IProduct
}

export const ProductCard: FC<IProductCard> = ({product}) => {
    const [selectedColor, setSelectedColor] = useState(product.colors[0]);

    const dispatch = useDispatch();

    const onAddToBasketHandler = () => {
        dispatch(addProduct({...product, selectedColor, quantityInBasket: 1}, true));
    }

    let navigate = useNavigate();

    const onBuyNowHandler = () => {
        dispatch(addProduct({...product, selectedColor, quantityInBasket: 1}));
        navigate("/basket")
    }
    const lang = useSelector(selectLang);

    return (
        <div className={style.productCard} key={product.id}>
            <Preview text={product.title}
                     colors={product.colors}
                     selectedColor={selectedColor}
                     onSelectHandler={(color: string) => setSelectedColor(color)}
            />

            <div className={style.infoBlock}>
                <div className={style.infoRow}>
                    <Link className={style.title}
                          to={`/product?productId=${product.id}`}>
                        {product.title}
                    </Link>
                    <p className={style.price}>{`${product.price} ₽`}</p>
                </div>

                <p className={style.brand}>{product.brand}</p>

                <div className={style.infoRow}>
                    <div className={style.rateWrapper}>
                        <Chip label={product.rate}
                              color="warning"
                              style={{marginRight: "5px"}}
                        />
                        <Rating name="read-only"
                                value={Number(product.rate)}
                                readOnly
                                size="small"
                        />
                    </div>

                    <p className={style.available}>
                        <span>
                            {product.available ? translate("available", lang) : translate("not available", lang)}
                        </span>
                        <span style={{
                            background: product.available ? 'lightgreen' : 'red'
                        }}/>
                    </p>

                </div>

                <Button variant='contained'
                        className={style.button}
                        size='small'
                        fullWidth
                        disabled={!product.available}
                        onClick={onAddToBasketHandler}
                >
                    {translate("Add to basket", lang)}
                </Button>

                <Button variant='contained'
                        color="success"
                        className={style.button}
                        size='small'
                        fullWidth
                        disabled={!product.available}
                        onClick={onBuyNowHandler}
                >
                    {translate("Buy now", lang)}
                </Button>
            </div>
        </div>
    )
}