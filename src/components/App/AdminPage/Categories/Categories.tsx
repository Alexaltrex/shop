import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {
    getCategories,
    selectCategories,
    selectCategoriesLoading,
} from "../../../../store/reducers/category.reducer";
import style from './categories.module.scss';
import {CategoryItem} from "./CategoryItem/CategoryItem";
import {AddCategory} from "./AddCategory/AddCategory";

export const Categories = () => {
    const dispatch = useDispatch();
    const categories = useSelector(selectCategories);
    const categoriesLoading = useSelector(selectCategoriesLoading);

    useEffect(() => {
        dispatch(getCategories());
    }, [dispatch]);

    return (
        <div className={style.categories}>
            {
                categories &&
                <div className={style.list}>
                    {
                        categories.map(category => <CategoryItem key={category.id} category={category}/>)
                    }
                </div>
            }
            <AddCategory/>
        </div>
    )
};