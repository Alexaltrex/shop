import React, {FC, useState} from "react";
import {ICategory} from "../../../../../types/types";
import style from './categoryItem.module.scss';
import {Button, TextField} from "@mui/material";
import {FormikErrors, FormikHelpers, useFormik} from "formik";
import {useDispatch} from "react-redux";
import styled from "@mui/material/styles/styled";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ClearIcon from '@mui/icons-material/Clear';
import EditIcon from '@mui/icons-material/Edit';
import SendIcon from '@mui/icons-material/Send';
import {categoryAPI} from "../../../../../api/category.api";
import {getCategories} from "../../../../../store/reducers/category.reducer";

const StyledTextField = styled(TextField)({
    '& .MuiOutlinedInput-input': {
        padding: "5px 10px",
    },
    '& p.MuiFormHelperText-root': {
        fontSize: '10px',
        lineHeight: '10px',
        position: 'absolute',
        left: 0,
        bottom: 0,
        transform: 'translateY(100%)',
        whiteSpace: 'nowrap'
    }
});

interface ICategoryItem {
    category: ICategory
}

interface IValues {
    title: string
}

export const CategoryItem: FC<ICategoryItem> = ({category}) => {
    const [showForm, setShowForm] = useState(false);
    const onRenameHandler = () => setShowForm(!showForm);

    const initialValues: IValues = {
        title: category.title,
    };
    const validate = (values: IValues): FormikErrors<IValues> => {
        const errors: FormikErrors<IValues> = {};
        if (!values.title) {
            console.log('required');
            errors.title = 'required'
        }
        return errors;
    };
    const dispatch = useDispatch();
    const onSubmit = async ({title}: IValues, formikHelpers: FormikHelpers<IValues>) => {
        try {
            await categoryAPI.update(category.id, title);
            dispatch(getCategories());
            setShowForm(false);
        } catch (e: any) {
            formikHelpers.setFieldError(e.response.data.error.field, e.response.data.error.value);
        } finally {
            formikHelpers.setSubmitting(false);
        }
    };
    const formik = useFormik({
        initialValues,
        validate,
        onSubmit
    });
    const onDeleteHandler = async () => {
        try {
           await categoryAPI.delete(category.id);
           dispatch(getCategories());
        } catch (e) {

        }
    };


    return (
        <div className={style.categoryItem}>
            {
                showForm
                    ? (
                        <form onSubmit={formik.handleSubmit}
                              className={style.form}>
                            <StyledTextField type="text"
                                             id="title"
                                             size="small"
                                             autoComplete="off"
                                             placeholder="Category title"
                                             value={formik.values.title}
                                             onChange={formik.handleChange}
                                             onBlur={formik.handleBlur}
                                             error={formik.touched.title && Boolean(formik.errors.title)}
                                             helperText={formik.touched.title && formik.errors.title}
                                             className={style.field}
                            />
                            <Button type='submit'
                                    variant="outlined"
                                    size="small"
                                    style={{marginLeft: "10px", textTransform: 'none'}}
                                    startIcon={<SendIcon/>}
                            >
                                Submit
                            </Button>
                        </form>
                    )
                    : (
                        <div className={style.titleBlock}>
                            <p>title:</p>
                            <p>{category.title}</p>
                        </div>
                    )
            }

            <Button variant="outlined"
                    size="small"
                    color={showForm ? "error" : "primary"}
                    style={{marginLeft: "10px", textTransform: 'none'}}
                    onClick={onRenameHandler}
                    startIcon={showForm ? <ClearIcon/> : <EditIcon/>}
            >
                {showForm ? 'Close' : 'Rename'}
            </Button>

            <Button variant="outlined"
                    color="error"
                    size="small"
                    style={{marginLeft: "10px", textTransform: 'none'}}
                    startIcon={<DeleteForeverIcon/>}
                    onClick={onDeleteHandler}
            >
                Delete
            </Button>
        </div>
    )
}