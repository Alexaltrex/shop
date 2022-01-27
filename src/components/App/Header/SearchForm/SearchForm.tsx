import React from "react";
import style from './searchForm.module.scss';
import {Field, Form, Formik, FormikHelpers, FormikProps} from "formik";
import SearchIcon from '@mui/icons-material/Search';
import {IconButton} from "@mui/material";
import ClearIcon from '@mui/icons-material/Clear';
import {useNavigate} from "react-router-dom";
import {categoryAC} from "../../../../store/reducers/category.reducer";
import {useDispatch} from "react-redux";
import {appAC} from "../../../../store/reducers/app.reducer";

interface IValues {
    query: string
}

export const SearchForm = () => {
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
            priceMin: null,
            priceMax: null,
        }));

        dispatch(appAC.setCatalogOpen(false));
    };

    return (
        <div className={style.searchForm}>
            <Formik initialValues={initialValues}
                    onSubmit={onSubmitHandler}
            >
                {
                    (formik: FormikProps<IValues>) => (
                        <Form>
                            <IconButton onClick={() => formik.resetForm()}>
                                <ClearIcon/>
                            </IconButton>
                            <Field name='query' type='text' className={style.field} autoComplete="off"/>
                            <IconButton type="submit">
                                <SearchIcon/>
                            </IconButton>
                        </Form>
                    )

                }

            </Formik>
        </div>
    )
}