import React, {FC} from "react";
import {IReview} from "../../../../../types/types";
import style from "./reviewItem.module.scss"
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { format } from "date-fns";
import {Rating} from "@mui/material";
import grey from "@mui/material/colors/grey";

export const ReviewItem: FC<IReview> = (props) => {
    const formatDate = format(new Date(props.date), "d LLLL yyyy, HH:mm");
    return (
        <div className={style.reviewItem}>
            <AccountCircleIcon sx={{fontSize: 40, color: grey[500]}}/>
            <div className={style.info}>
                <div className={style.nameRow}>
                    <p className={style.userName}>{props.userName}</p>
                    <p className={style.date}>{formatDate}</p>
                </div>
                <Rating value={props.rating}
                        readOnly
                        className={style.rating}
                        size="small"
                />
                <p className={style.review}>{props.review}</p>

            </div>
        </div>
    )
}