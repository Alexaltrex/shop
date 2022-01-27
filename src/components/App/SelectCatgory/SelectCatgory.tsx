import React from "react";
import style from './selectCategory.module.scss';
import './selectCategory.css'
import clsx from "clsx";

export const SelectCategory = () => {
    return (
        <div className={style.selectCategory}>
            <div className={clsx(style.cube, "cubeAnimation")}>
                <div className={style.front}>
                    Select category
                </div>
                <div className={style.back}>
                    Select category
                </div>
                <div className={style.top}>
                    Select category
                </div>
                <div className={style.bottom}>
                    Select category
                </div>
                <div className={style.left}>
                    Select category
                </div>
                <div className={style.right}>
                    Select category
                </div>
            </div>
        </div>
    )
}