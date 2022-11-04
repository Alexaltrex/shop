import clsx from "clsx";
import {CategoryList} from "./CategoryList";
import React from "react";
import {useSelector} from "react-redux";
import {selectCatalogOpen} from "../../../store/reducers/app.reducer";
import style from "./categoryListWrapper.module.scss"

export const CategoryListWrapper = () => {
    const catalogOpen = useSelector(selectCatalogOpen);
    return (
        <div className={clsx({
            [style.categoryListWrapper]: true,
            [style.categoryListWrapper_show]: catalogOpen,
        })}>
            <CategoryList/>
        </div>
    )
}