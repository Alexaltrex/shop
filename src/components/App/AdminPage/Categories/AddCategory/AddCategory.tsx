import React, {useState} from "react";
import AddBoxIcon from '@mui/icons-material/AddBox';
import CancelIcon from '@mui/icons-material/Cancel';
import {Button, TextField} from "@mui/material";
import styled from "@mui/material/styles/styled";
import {FormikErrors, FormikHelpers, useFormik} from "formik";
import {useDispatch} from "react-redux";
import style from "../CategoryItem/categoryItem.module.scss";
import SendIcon from '@mui/icons-material/Send';
import {getCategories} from "../../../../../store/reducers/category.reducer";
import {categoryAPI} from "../../../../../api/category.api";

const StyledTextField = styled(TextField)({
    '& .MuiOutlinedInput-input': {
        padding: "5px 10px",
    },
    '& p.MuiFormHelperText-root': {
        position: 'absolute',
        left: 0,
        bottom: 0,
        transform: 'translateY(100%)',
        whiteSpace: 'nowrap'
    }
});

interface IValues {
    title: string
}

export const AddCategory = () => {
    const [showForm, setShowForm] = useState(false);
    const onClickHandler = () => {
        setShowForm(!showForm);
    };
    const initialValues: IValues = {
        title: '',
    };
    const validate = (values: IValues): FormikErrors<IValues> => {
        const errors: FormikErrors<IValues> = {};
        if (!values.title) {
            errors.title = 'required'
        }
        return errors;
    };
    const dispatch = useDispatch();
    const onSubmit = async ({title}: IValues, formikHelpers: FormikHelpers<IValues>) => {
        try {
            await categoryAPI.create(title);
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

    return (
        <div style={{marginTop: "10px", display: "flex", alignItems: "center"}}>
            {
                showForm && (
                    <form onSubmit={formik.handleSubmit}
                          style={{
                              display: "flex",
                              alignItems: "center",
                              marginRight: "10px"
                          }}>
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
            }

            <Button variant={showForm ? "outlined" : "contained"}
                    color={showForm ? "error" : "success"}
                    size="small"
                    style={{textTransform: 'none'}}
                    startIcon={showForm ? <CancelIcon/> : <AddBoxIcon/>}
                    onClick={onClickHandler}
            >
                {showForm ? 'Cancel' : 'Add category'}
            </Button>
        </div>
    )
};