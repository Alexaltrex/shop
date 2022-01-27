import React, {FC, useState} from "react";
import {RatingType} from "../../../../types/types";
import style from "./productRating.module.scss"
import {Rating} from "@mui/material";
import {useRating} from "../../../../hooks/useRating";
import Button from "@mui/material/Button";
import {getUserInfo} from "../../../../localStorage/localStorage";

interface IRating {
    rating: RatingType
    rate: string
}

export const ProductRating: FC<IRating> = ({rating, rate}) => {
    const {count} = useRating(rating);

    const userInfo = getUserInfo();
    const [value, setValue] = useState<number | null>(0);

    return (
        <div className={style.productRating}>
            <div className={style.ratingInfo}>
                <div className={style.leftBlock}>
                    <p className={style.rate}>{rate}</p>
                    <p>{`based on ${count} reviews`}</p>
                    <Rating value={Number(rate)}
                            readOnly
                    />
                </div>
                <div className={style.rightBlock}>
                    {
                        [...Object.keys(rating)].map((key, index) => (
                            <div className={style.item} key={index}>
                                <p className={style.key}>{key}</p>
                                <div className={style.line}>
                                    <div className={style.innerLine}
                                         style={{
                                             width: `${
                                                 count === 0
                                                     ? 0
                                                     : Math.round(100 * Object.values(rating)[index] / count)
                                             }%`
                                         }}
                                    />
                                </div>
                                <p className={style.procent}>{`${
                                    count === 0
                                        ? 0
                                        : Math.round(100 * Object.values(rating)[index] / count)
                                }%`}</p>
                            </div>
                        ))
                    }
                </div>
            </div>
            {
                userInfo && userInfo.role === "user" &&
                <div className={style.makeRateBlock}>
                    <Button variant="contained">Rate a product</Button>
                    <Rating
                        value={value}
                        sx={{marginTop: "10px"}}
                        onChange={(event, newValue) => {
                            setValue(newValue);
                        }}
                    />
                </div>
            }


        </div>
    )
}