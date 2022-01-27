import React from "react";
import style from './colors.module.scss';
import {colors} from "../../../../constants/constants";
import clsx from "clsx";
import {useDispatch, useSelector} from "react-redux";
import {categoryAC, selectFilterParams} from "../../../../store/reducers/category.reducer";
import {ResetButton} from "../../../common/ResetButton/ResetButton";

export const Colors = () => {
    const filterParams = useSelector(selectFilterParams);
    const colorsSelected = filterParams.colors;
    const dispatch = useDispatch();

    const onResetHandler = () => dispatch(categoryAC.setFilterParams({...filterParams, colors: []}));

    return (
        <div className={style.colors}>
            <ResetButton onResetHandler={onResetHandler}/>
            <div className={style.items}>
                {
                    colors.map(color => (
                        <div key={color}
                             className={clsx({
                                 [style.item]: true,
                                 [style.item_selected]: colorsSelected.includes(color),
                             })}
                             onClick={() => {
                                 if (colorsSelected.includes(color)) {
                                     dispatch(categoryAC.setFilterParams({
                                         ...filterParams,
                                         colors: [...colorsSelected].filter(el => el !== color)
                                     }));
                                 } else {
                                     dispatch(categoryAC.setFilterParams({
                                         ...filterParams,
                                         colors: [...colorsSelected, color]
                                     }));
                                 }
                             }}
                        >
                            <div className={style.itemInner}
                                 style={{background: color}}/>
                        </div>
                    ))
                }
            </div>
        </div>
    )
};