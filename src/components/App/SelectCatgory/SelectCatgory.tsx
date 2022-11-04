import React from "react";
import style from './selectCategory.module.scss';
import './selectCategory.css'
import clsx from "clsx";
import {useSelector} from "react-redux";
import {selectLang} from "../../../store/reducers/app.reducer";
import {translate} from "../../../types/lang";

export const SelectCategory = () => {
    const lang = useSelector(selectLang);
    const text = translate("Select category", lang);
    return (
        <div className={style.selectCategory}>
            <div className={clsx(style.cube, "cubeAnimation")}>
                <div className={style.front}><p>{text}</p></div>
                <div className={style.back}><p>{text}</p></div>
                <div className={style.top}><p>{text}</p></div>
                <div className={style.bottom}><p>{text}</p></div>
                <div className={style.left}><p>{text}</p></div>
                <div className={style.right}><p>{text}</p></div>
            </div>
        </div>
    )
}