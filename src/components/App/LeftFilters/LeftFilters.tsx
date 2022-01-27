import React from "react";
import style from './leftFilters.module.scss';
import {LeftFilterItem} from "../LeftFilterItem/LeftFilterItem";
import {Available} from "./Available/Available";
import {Brand} from "./Brand/Brand";
import {Price} from "./Price/Price";
import {Colors} from "./Colors/Colors";

export const LeftFilters = () => {
    return (
        <div className={style.leftFilters}>
            <LeftFilterItem title='Available' content={<Available/>}/>
            <LeftFilterItem title='Brand' content={<Brand/>}/>
            <LeftFilterItem title='Price' content={<Price/>}/>
            <LeftFilterItem title='Colors' content={<Colors/>}/>
        </div>
    )
}