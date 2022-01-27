import React, {useEffect} from "react";
import style from './productsPage.module.scss';
import {CategoryList} from "../CategoryList/CategoryList";
import {LeftFilters} from "../LeftFilters/LeftFilters";
import {useDispatch, useSelector} from "react-redux";
import {selectCatalogOpen} from "../../../store/reducers/app.reducer";
import clsx from "clsx";
import {Outlet, useSearchParams} from "react-router-dom";
import {
    categoryAC, getProducts,
    selectFilterParams,
    selectIsLoading, selectPageCount,
    selectProducts
} from "../../../store/reducers/category.reducer";
import {Paginator} from "../../common/Paginator/Paginator";
import {ProductCard} from "../ProductCard/ProductCard";
import {NotFoundResult} from "../../common/NotFondResult/NotFoundResult";
import Skeleton from "@mui/material/Skeleton";
import {serializeSearchParams} from "../../../helpers/helpers";
import {SortingPanel} from "../SortingPanel/SortingPanel";
import {SortType} from "../../../types/types";

export const ProductsPage = () => {
    const catalogOpen = useSelector(selectCatalogOpen);
    const products = useSelector(selectProducts);
    const isLoading = useSelector(selectIsLoading);
    const pageCount = useSelector(selectPageCount);
    const filterParams = useSelector(selectFilterParams);

    const minMaxPrice = localStorage.getItem("minMaxPrice")
        ? JSON.parse(localStorage.getItem("minMaxPrice") as string)
        : null;

    let [searchParams, setSearchParams] = useSearchParams();
    const dispatch = useDispatch();

    // при перезагрузке считываем фильтры из url и записываем в store
    useEffect(() => {
        const nextFilterParams = {...filterParams};

        const available = searchParams.get('available');
        const categoryId = searchParams.get('categoryId');
        const page = searchParams.get('page');
        const brands = searchParams.get('brands');
        const colors = searchParams.get('colors');
        const priceMin = searchParams.get('priceMin');
        const priceMax = searchParams.get('priceMax');
        const query = searchParams.get('query');
        const sort = searchParams.get('sort');

        if (sort) {
            nextFilterParams.sort = sort as SortType;
        } else {
            nextFilterParams.available = 'default';
        }

        if (available) {
            nextFilterParams.available = available;
        } else {
            nextFilterParams.available = 'all';
        }

        if (categoryId) {
            nextFilterParams.categoryId = categoryId;
        }

        if (page) {
            nextFilterParams.page = page;
        }

        if (brands) {
            nextFilterParams.brands = brands.split(',');
        }

        if (colors) {
            nextFilterParams.colors = colors.split(',');
        }

        if (priceMin) {
            nextFilterParams.priceMin = priceMin;
            dispatch(categoryAC.setPriceMinLocal(Number(priceMin)));
        }

        if (priceMax) {
            nextFilterParams.priceMin = priceMax;
            dispatch(categoryAC.setPriceMaxLocal(Number(priceMax)));
        }

        if (query) {
            nextFilterParams.query = query;
        }

        dispatch(categoryAC.setFilterParams(nextFilterParams));

    }, []);

    // при изменении фильтров в store, изменяем url и запрашиваем продукты по апи
    useEffect(() => {
        const nextSearchParams = {...serializeSearchParams(searchParams)};

        if (filterParams.sort !== 'default') {
            nextSearchParams.sort = filterParams.sort;
        } else {
            delete nextSearchParams.sort;
        }

        if (filterParams.page && filterParams.page !== '1') {
            nextSearchParams.page = filterParams.page;
        } else {
            delete nextSearchParams.page;
        }

        if (filterParams.query) {
            nextSearchParams.query = filterParams.query;
        } else {
            delete nextSearchParams.query;
        }

        if (filterParams.available === 'all') {
            delete nextSearchParams.available;
        } else {
            nextSearchParams.available = filterParams.available;
        }

        if (filterParams.brands.length !== 0) {
            nextSearchParams.brands = filterParams.brands.join(',');
        } else {
            delete nextSearchParams.brands;
        }

        if (minMaxPrice && filterParams.priceMin && Number(filterParams.priceMin) !== Number(minMaxPrice!.priceMin)) {
            nextSearchParams.priceMin = filterParams.priceMin as string;
            console.log('test 1')
        }
        if (minMaxPrice && filterParams.priceMin && Number(filterParams.priceMin) === Number(minMaxPrice!.priceMin)) {
            console.log('test 2')
            delete nextSearchParams.priceMin;
        }

        if (minMaxPrice && filterParams.priceMax && Number(filterParams.priceMax) !== Number(minMaxPrice!.priceMax)) {
            nextSearchParams.priceMax = filterParams.priceMax as string;
        }
        if (minMaxPrice && filterParams.priceMax && Number(filterParams.priceMax) === Number(minMaxPrice!.priceMax)) {
            delete nextSearchParams.priceMax;
        }

        if (filterParams.colors.length !== 0) {
            nextSearchParams.colors = filterParams.colors.join(',');
        } else {
            delete nextSearchParams.colors;
        }

        setSearchParams(nextSearchParams);

        dispatch(getProducts(filterParams));

    }, [filterParams]);

    return (
        <div className={style.productsPage}>
            <div className={clsx({
                [style.categoryListWrapper]: true,
                [style.categoryListWrapper_show]: catalogOpen,
            })}>
                <CategoryList/>
            </div>

            <LeftFilters/>
            <div className={style.content}>
                <SortingPanel/>

                <Outlet/>

                <Paginator pageCount={pageCount}/>

                {
                    products && !isLoading && pageCount !== null
                        ? products.length !== 0
                        ? (
                            <div className={style.products}>
                                {
                                    products.map(product => <ProductCard key={product.id} product={product}/>)
                                }
                            </div>
                        )
                        : <NotFoundResult/>

                        : <div className={style.preloader}>
                            {
                                [0, 1, 2, 3].map(i => <Skeleton key={i}
                                                                height={200}
                                                                variant='rectangular'
                                                                animation='wave'
                                                                className={style.skeleton}
                                />)
                            }
                        </div>
                }

            </div>

        </div>
    )
};