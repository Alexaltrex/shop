import React from "react";
import style from './registrationPage.module.scss';
import {FormikErrors, FormikHelpers, useFormik} from "formik";
import {Button, TextField} from "@mui/material";
import {useDispatch} from "react-redux";
import Typography from "@mui/material/Typography";
import {useNavigate} from "react-router-dom";
import styled from "@mui/material/styles/styled";
import {appAC} from "../../../store/reducers/app.reducer";
import {authAPI} from "../../../api/auth.api";

export interface IRegistrationValues {
    login: string
    email: string
    password: string
}

const StyledTextField = styled(TextField)({
    '& p.MuiFormHelperText-root': {
        position: 'absolute',
        left: 0,
        bottom: 0,
        transform: 'translateY(100%)'
    }
});

export const RegistrationPage = () => {

    const initialValues: IRegistrationValues = {
        login: '',
        email: '',
        password: '',
    };

    let navigate = useNavigate();
    const dispatch = useDispatch();

    const onSubmit = async ({login, email, password}: IRegistrationValues, formikHelpers: FormikHelpers<IRegistrationValues>) => {
        try {
            dispatch(appAC.setLoading(true));
            await authAPI.registration(login, email, password);
            navigate('/login');
        } catch (e: any) {
            // @ts-ignore
            formikHelpers.setFieldError(e.response.data.error.field, e.response.data.error.value);
        } finally {
            dispatch(appAC.setLoading(false));
            formikHelpers.setSubmitting(false);
        }
    };

    const validate = (values: IRegistrationValues): FormikErrors<IRegistrationValues> => {
        const errors: FormikErrors<IRegistrationValues> = {};
        if (!values.login) {
            errors.login = 'required'
        }
        if (!values.email) {
            errors.email = 'required'
        }
        if (!values.password) {
            errors.password = 'required'
        }
        return errors;
    };

    const formik = useFormik({
        initialValues,
        validate,
        onSubmit
    });

    return (
        <div className={style.registrationPage}>
            <form onSubmit={formik.handleSubmit}
                  className={style.form}
            >
                <Typography variant='h4' align='center'>
                    Registration
                </Typography>
                <StyledTextField type="text"
                                 fullWidth
                                 variant="outlined"
                                 id="login"
                                 label="Login"
                                 value={formik.values.login}
                                 onChange={formik.handleChange}
                                 onBlur={formik.handleBlur}
                                 error={formik.touched.login && Boolean(formik.errors.login)}
                                 helperText={formik.touched.login && formik.errors.login}
                                 className={style.field}
                />
                <StyledTextField type="text"
                                 fullWidth
                                 variant="outlined"
                                 id="email"
                                 label="email"
                                 value={formik.values.email}
                                 onChange={formik.handleChange}
                                 onBlur={formik.handleBlur}
                                 error={formik.touched.email && Boolean(formik.errors.email)}
                                 helperText={formik.touched.email && formik.errors.email}
                                 className={style.field}
                />
                <StyledTextField type="password"
                                 fullWidth
                                 variant="outlined"
                                 id="password"
                                 label="Password"
                                 value={formik.values.password}
                                 onChange={formik.handleChange}
                                 onBlur={formik.handleBlur}
                                 error={formik.touched.password && Boolean(formik.errors.password)}
                                 helperText={formik.touched.password && formik.errors.password}
                                 className={style.field}
                />
                <Button type='submit'
                        color="primary"
                        fullWidth
                        variant="contained"
                        className={style.field}
                >
                    Submit
                </Button>
            </form>
        </div>
    )
};

