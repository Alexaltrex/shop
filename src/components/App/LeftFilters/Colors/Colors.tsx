import React, {useEffect, useState} from "react";
import style from './colors.module.scss';
import {colors as colorsList} from "../../../../constants/constants";
import clsx from "clsx";
import {useDispatch, useSelector} from "react-redux";
import {categoryAC, selectFilterParams} from "../../../../store/reducers/category.reducer";
import {ResetButton} from "../../../common/ResetButton/ResetButton";

export const Colors = () => {
    const filterParams = useSelector(selectFilterParams);
    const colorsSelectedGlobal = filterParams.colors;

    const [colorsSelectedLocal, setColorsSelectedLocal] = useState(filterParams.colors);

    const onResetHandler = () => setColorsSelectedLocal([]);

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(categoryAC.setFilterParams({
            ...filterParams,
            colors: colorsSelectedLocal,
            page: "1",
        }));
    }, [colorsSelectedLocal])

    return (
        <div className={style.colors}>
            <ResetButton onResetHandler={onResetHandler}/>
            <div className={style.items}>
                {
                    colorsList.map(color => (
                        <div key={color}
                             className={clsx({
                                 [style.item]: true,
                                 [style.item_selected]: colorsSelectedGlobal.includes(color),
                             })}
                             onClick={() => {
                                 if (colorsSelectedGlobal.includes(color)) {
                                     setColorsSelectedLocal([...colorsSelectedLocal].filter(el => el !== color));
                                 } else {
                                     setColorsSelectedLocal([...colorsSelectedLocal, color]);
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