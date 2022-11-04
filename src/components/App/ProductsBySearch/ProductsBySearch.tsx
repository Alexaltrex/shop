import React from "react";
import {useSelector} from "react-redux";
import {selectLang} from "../../../store/reducers/app.reducer";
import {translate} from "../../../types/lang";

export const ProductsBySearch = () => {
    const lang = useSelector(selectLang);
    return (
        <h2>{translate("Search Products", lang)}</h2>
    )
};