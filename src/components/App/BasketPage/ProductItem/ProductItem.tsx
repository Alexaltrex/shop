import React, {FC} from "react";
import style from "./productItem.module.scss"
import {Preview} from "../../../common/Preview/Preview";
import {IProductBasket} from "../../../../types/types";
import RemoveIcon from '@mui/icons-material/Remove';
import {IconButton} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import {useDispatch, useSelector} from "react-redux";
import {deleteProduct, selectIsLoading, updateCount} from "../../../../store/reducers/busket.reducer";
import Button from "@mui/material/Button";
import {Link} from "react-router-dom";

export interface IProductItem {
    productBasket: IProductBasket
}

export const ProductItem: FC<IProductItem> = ({productBasket}) => {
    const isLoading = useSelector(selectIsLoading);

    const dispatch = useDispatch();

    const onMinusHandler = () => {
        dispatch(updateCount(productBasket.productInBasketId, productBasket.quantityInBasket - 1));
    };
    const onPlusHandler = () => {
        dispatch(updateCount(productBasket.productInBasketId, productBasket.quantityInBasket + 1));
    };
    const onClickHandler = () => {
        dispatch(deleteProduct(productBasket.productInBasketId));
    }

    return (
        <div className={style.productItem}>
            <div className={style.leftBlock}>
                <div className={style.preview}>
                    <Preview colors={[]}
                             text={productBasket.title}
                             selectedColor={productBasket.selectedColor}
                             onSelectHandler={(c: string) => {
                             }}
                             isButtons={false}
                    />
                </div>

                <div className={style.info}>
                    <Link className={style.title}
                          to={`/product?productId=${productBasket.id}`}>
                        {productBasket.title}
                    </Link>
                    {/*<p className={style.title}>{productBasket.title}</p>*/}
                    <p className={style.brand}>{productBasket.brand}</p>
                </div>
            </div>
            <div className={style.rightBlock}>

                <div className={style.countBlockWrapper}>
                    <div className={style.countBlock}>
                        <IconButton sx={{border: "2px solid #CCC"}}
                                    disabled={productBasket.quantityInBasket === 1 || isLoading}
                                    onClick={onMinusHandler}
                        >
                            <RemoveIcon/>
                        </IconButton>

                        <p className={style.count}>{productBasket.quantityInBasket}</p>

                        <IconButton sx={{border: "2px solid #CCC"}}
                                    disabled={productBasket.quantityInBasket === productBasket.quantity || isLoading}
                                    onClick={onPlusHandler}
                        >
                            <AddIcon/>
                        </IconButton>
                        {
                            productBasket.quantityInBasket === productBasket.quantity &&
                            <p className={style.maxCount}>Max count</p>
                        }
                    </div>

                    <Button size="small"
                            sx={{
                                textTransform: "none",
                                padding: 0,
                                minWidth: 0,
                            }}
                            className={style.button}
                            onClick={onClickHandler}
                    >
                        Delete
                    </Button>
                </div>

                <p className={style.price}>
                    {`${productBasket.price * productBasket.quantityInBasket} ₽`}
                </p>

            </div>

        </div>
    )
}