import React, {useEffect} from "react";
import style from './searchForm.module.scss';
import {Field, Form, Formik, FormikHelpers, FormikProps, useFormik} from "formik";
import SearchIcon from '@mui/icons-material/Search';
import {IconButton} from "@mui/material";
import ClearIcon from '@mui/icons-material/Clear';
import {useLocation, useNavigate} from "react-router-dom";
import {categoryAC} from "../../../../store/reducers/category.reducer";
import {useDispatch} from "react-redux";
import {appAC} from "../../../../store/reducers/app.reducer";

interface IValues {
    query: string
}

export const SearchForm = () => {
    const minMaxPrice = localStorage.getItem("minMaxPrice")
        ? JSON.parse(localStorage.getItem("minMaxPrice") as string)
        : null;

    const initialValues: IValues = {
        query: ''
    };

    let navigate = useNavigate();

    const dispatch = useDispatch();

    const onSubmitHandler = (
        values: IValues,
        formikHelpers: FormikHelpers<IValues>
    ) => {
        formikHelpers.setSubmitting(false);

        navigate(`/products/search`);//?query=${values.query}`);

        dispatch(categoryAC.setFilterParams({
            query: values.query,
            sort: 'default',
            categoryId: null,
            available: 'all',
            brands: [],
            colors: [],
            page: '1',
            priceMin: minMaxPrice && String(minMaxPrice.priceMin),
            priceMax: minMaxPrice && String(minMaxPrice.priceMax),
        }));
        dispatch(categoryAC.setPriceMinLocal(minMaxPrice ? String(minMaxPrice.priceMin) : "1"))
        dispatch(categoryAC.setPriceMaxLocal(minMaxPrice ? String(minMaxPrice.priceMax) : "100"))
        dispatch(appAC.setCatalogOpen(false));
    };

    const formik = useFormik({
        initialValues,
        onSubmit: onSubmitHandler
    });

    const location = useLocation();

    useEffect(() => {
        if (location.pathname !== "/products/search") {
            formik.resetForm()
        }
    }, [location.pathname])

    return (
        <div className={style.searchForm}>
            <form onSubmit={formik.handleSubmit}>
                <IconButton onClick={() => formik.resetForm()}>
                    <ClearIcon/>
                </IconButton>
                <input type="text"
                       className={style.field}
                       autoComplete="off"
                       {...formik.getFieldProps("query")}
                />
                <IconButton type="submit">
                    <SearchIcon/>
                </IconButton>
            </form>
        </div>
    )
}