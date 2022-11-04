import React from "react";
import style from './sortingPanel.module.scss';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import clsx from "clsx";
import {categoryAC, selectFilterParams} from "../../../store/reducers/category.reducer";
import {useDispatch, useSelector} from "react-redux";
import {selectLang} from "../../../store/reducers/app.reducer";
import {translate} from "../../../types/lang";

export const SortingPanel = () => {
    const filterParams = useSelector(selectFilterParams);
    const sort = filterParams.sort;
    const dispatch = useDispatch();
    const lang = useSelector(selectLang);

    return (
        <div className={style.sortingPanel}>
            <p className={style.text}>Sort by:</p>
            <button className={clsx({
                [style.button]: true,
                [style.button_active]: sort === 'default'
            })}
                    onClick={() => dispatch(categoryAC.setFilterParams({
                        ...filterParams,
                        sort: 'default',
                        page: "1",
                    }))}
            >
                <p>{translate("Default", lang)}</p>
            </button>

            <button className={clsx({
                [style.button]: true,
                [style.button_active]: sort === 'priceUp' || sort === 'priceDown'
            })}
                    onClick={() => dispatch(categoryAC.setFilterParams({
                        ...filterParams,
                        sort: sort === 'priceUp' ? 'priceDown' : 'priceUp',
                        page: "1",
                    }))}
            >
                <p>{translate("Price", lang)}</p>
                {sort === 'priceUp' && <ArrowUpwardIcon fontSize="small"/>}
                {sort === 'priceDown' && <ArrowDownwardIcon fontSize="small"/>}
            </button>

            <button className={clsx({
                [style.button]: true,
                [style.button_active]: sort === 'ratingUp' || sort === 'ratingDown'
            })}
                    onClick={() => dispatch(categoryAC.setFilterParams({
                        ...filterParams,
                        sort: sort === 'ratingUp' ? 'ratingDown' : 'ratingUp',
                        page: "1",
                    }))}
            >
                <p>{translate("Rating", lang)}</p>
                {sort === 'ratingUp' && <ArrowUpwardIcon fontSize="small"/>}
                {sort === 'ratingDown' && <ArrowDownwardIcon fontSize="small"/>}

            </button>
        </div>
    )
}