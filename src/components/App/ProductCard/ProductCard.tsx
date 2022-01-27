import React, {FC} from "react";
import {Preview} from "../../common/Preview/Preview";
import {Link} from "react-router-dom";
import Button from "@mui/material/Button";
import {IProduct} from "../../../types/types";
import style from './productCard.module.scss';
import {useRating} from "../../../hooks/useRating";
import {Rating} from "@mui/material";
import Chip from "@mui/material/Chip";

interface IProductCard {
    product: IProduct
}

export const ProductCard: FC<IProductCard> = ({product}) => {
    return (
        <div className={style.productCard} key={product.id}>
            <Preview text={product.title} colors={product.colors}/>

            <div className={style.infoBlock}>
                <div className={style.infoRow}>
                    <Link className={style.title}
                          to={`/product?productId=${product.id}`}>
                        {product.title}
                    </Link>
                    <p className={style.price}>{`${product.price} ₽`}</p>
                </div>
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
                        <span>available</span>
                        <span style={{
                            background: product.available ? 'lightgreen' : 'red'
                        }}/>
                    </p>

                </div>
                <Button variant='contained'
                        size='small'
                        disabled={!product.available}
                        fullWidth={true}
                        style={{ marginTop: "10px" }}
                >
                    Buy
                </Button>
            </div>

        </div>
    )
}