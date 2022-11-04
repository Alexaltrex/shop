import React, {FC} from "react";
import style from './leftFilters.module.scss';
import {LeftFilterItem} from "../LeftFilterItem/LeftFilterItem";
import {Available} from "./Available/Available";
import {Brand} from "./Brand/Brand";
import {Price} from "./Price/Price";
import {Colors} from "./Colors/Colors";
import {Category} from "./Category/Category";
import {useSelector} from "react-redux";
import {selectLang} from "../../../store/reducers/app.reducer";
import {translate} from "../../../types/lang";

interface ILeftFilters {
    type?: 'category' | 'search'
}

export const LeftFilters: FC<ILeftFilters> = ({type= 'category'}) => {
    const lang = useSelector(selectLang);

    return (
        <div className={style.leftFilters}>
            <LeftFilterItem title={translate("Available", lang)} content={<Available/>}/>
            {
                type === 'search' &&
                <LeftFilterItem title={translate("Category", lang)} content={<Category/>}/>
            }
            <LeftFilterItem title={translate("Brand", lang)} content={<Brand/>}/>
            <LeftFilterItem title={translate("Price", lang)} content={<Price/>}/>
            <LeftFilterItem title={translate("Colors", lang)} content={<Colors/>}/>

        </div>
    )
}