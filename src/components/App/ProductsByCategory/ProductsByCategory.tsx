import React from "react";
import {useSearchParams} from "react-router-dom";
import {useSelector} from "react-redux";
import {StateType} from "../../../store/store";

export const ProductsByCategory = () => {
    let [searchParams, setSearchParams] = useSearchParams();
    const categoryId = searchParams.get('categoryId');

    const categoryTitle = useSelector((state: StateType) => {
        if (!categoryId || !state.category.categories) return null;
        const category = state.category.categories.find(el => el.id === categoryId);
        if (category) {
            return category.title
        } else {
            return null
        }
    });

    return (
        <h2>{categoryTitle}</h2>
    )
};