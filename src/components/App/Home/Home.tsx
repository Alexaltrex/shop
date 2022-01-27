import style from './home.module.scss';
import React from "react";
import {CategoryList} from "../CategoryList/CategoryList";
import {SelectCategory} from "../SelectCatgory/SelectCatgory";

export const Home = () => {
    return (
        <div className={style.home}>
            <CategoryList/>
            <div className={style.homeContent}>
                <SelectCategory/>
                {/*<p>Select category</p>*/}
            </div>
        </div>
    )
}