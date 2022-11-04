import React, {useEffect} from "react";
import style from './categoryList.module.scss';
import {useDispatch, useSelector} from "react-redux";
import {
    categoryAC,
    getCategories,
    selectCategories, selectCategoriesLoading, selectFilterParams
} from "../../../store/reducers/category.reducer";
import {Link} from "react-router-dom";
import CategoryIcon from '@mui/icons-material/Category';
import {appAC} from "../../../store/reducers/app.reducer";

export const CategoryList = () => {
    const dispatch = useDispatch();
    const categories = useSelector(selectCategories);
    const categoriesLoading = useSelector(selectCategoriesLoading);
    const filterParams = useSelector(selectFilterParams);

    useEffect(() => {
        dispatch(getCategories());
    }, [dispatch]);

    return (
        <div className={style.categoryList}>
            {
                categories && !categoriesLoading && (
                    <div>
                        {
                            categories.map(category => (
                                <Link key={category.id}
                                      to={`/products/category?categoryId=${category.id}`}
                                      className={style.item}
                                      onClick={() => {
                                          dispatch(categoryAC.setSelectedCategory(category));
                                          dispatch(categoryAC.setFilterParams({
                                              ...filterParams,
                                              sort: 'default',
                                              query: null,
                                              available: 'all',
                                              brands: [],
                                              colors: [],
                                              page: '1',
                                              priceMin: null,
                                              priceMax: null,
                                              categoryId: category.id
                                          })); // сброс фильтров
                                          dispatch(appAC.setCatalogOpen(false));
                                      }}
                                >
                                    <CategoryIcon/>
                                    <p>{category.title}</p>
                                </Link>
                            ))
                        }
                    </div>
                )
            }
        </div>
    )
};