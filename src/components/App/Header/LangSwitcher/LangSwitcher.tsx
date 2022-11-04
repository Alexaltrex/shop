import React from "react";
import style from "./LangSwitcher.module.scss";
import clsx from "clsx";
import {useDispatch, useSelector} from "react-redux";
import {appAC, selectLang} from "../../../../store/reducers/app.reducer";

export const LangSwitcher = () => {
    const lang = useSelector(selectLang);
    const dispatch = useDispatch();

    return (
        <div className={style.langSwitcher}>
            <button className={clsx({
                [style.btn]: true,
                [style.btn_select]: lang === 'ENG',
            })}
                    onClick={() => dispatch(appAC.setLang('ENG'))}
            >
                ENG
            </button>
            <button className={clsx({
                [style.btn]: true,
                [style.btn_select]: lang === 'RUS',
            })}
                    onClick={() => dispatch(appAC.setLang('RUS'))}
            >
                RUS
            </button>
            <div className={clsx({
                [style.mask]: true,
                [style.mask_right]: lang === 'RUS',
            })}/>
        </div>
    )
}