import React, {useState} from "react";
import KeyIcon from '@mui/icons-material/Key';
import {Button, TextField} from "@mui/material";
import {FormikErrors, FormikHelpers, useFormik} from "formik";
import {useDispatch, useSelector} from "react-redux";
import {appAC, selectLang, selectLoading} from "../../../../store/reducers/app.reducer";
import style from "./security.module.scss"
import styled from "@mui/material/styles/styled";
import {authAPI} from "../../../../api/auth.api";
import {translate} from "../../../../types/lang";


export interface IValues {
    oldPassword: string
    newPassword1: string
    newPassword2: string
}

const StyledTextField = styled(TextField)({
    '& p.MuiFormHelperText-root': {
        position: 'absolute',
        left: 0,
        bottom: 0,
        transform: 'translateY(100%)'
    }
});

export const Security = () => {
    const [showForm, setShowForm] = useState(false);
    const isLoading = useSelector(selectLoading);

    const initialValues: IValues = {
        oldPassword: "",
        newPassword1: "",
        newPassword2: "",
    };

    const dispatch = useDispatch();
    const onSubmit = async ({oldPassword, newPassword1, newPassword2}: IValues, formikHelpers: FormikHelpers<IValues>) => {
        try {
            dispatch(appAC.setLoading(true));
            await authAPI.changePassword(oldPassword, newPassword1);
            setShowForm(false);
            dispatch(appAC.showInfoPopup({type: "success", text: "Password successfully changed"}))
        } catch (e: any) {
            formikHelpers.setErrors({
                oldPassword: '  ',
                newPassword1: '  ',
                newPassword2: e.response.data.message
            });
        } finally {
            dispatch(appAC.setLoading(false));
            formikHelpers.setSubmitting(false);
        }
    };

    const validate = ({oldPassword, newPassword1, newPassword2}: IValues): FormikErrors<IValues> => {
        const errors: FormikErrors<IValues> = {};
        if (!oldPassword) {
            errors.oldPassword = translate("required", lang);
        }
        if (!newPassword1) {
            errors.newPassword1 = translate("required", lang);
        }
        if (!newPassword2) {
            errors.newPassword2 = translate("required", lang);
        }
        if (newPassword1 && newPassword2 && newPassword1 !== newPassword2) {
            errors.newPassword2 = 'passports does not match'
        }
        if (newPassword1 && newPassword2 && newPassword1 === newPassword2 && newPassword1 === oldPassword) {
            errors.newPassword2 = 'password is the same as the old one'
        }
        return errors;
    };

    const formik = useFormik({
        initialValues,
        validate,
        onSubmit
    });

    const lang = useSelector(selectLang);

    return (
        <div className={style.security}>
            <Button variant="contained"
                    startIcon={<KeyIcon/>}
                    onClick={() => setShowForm(true)}
            >
                {translate("Change password", lang)}
            </Button>
            {
                showForm && (
                    <form onSubmit={formik.handleSubmit}
                          className={style.form}
                    >
                        <StyledTextField type="password"
                                         size="small"
                                         fullWidth
                                         variant="outlined"
                                         id="oldPassword"
                                         label={translate("Old password", lang)}
                                         error={formik.touched.oldPassword && Boolean(formik.errors.oldPassword)}
                                         helperText={formik.touched.oldPassword && formik.errors.oldPassword}
                                         {...formik.getFieldProps("oldPassword")}
                                         className={style.field}
                        />
                        <StyledTextField type="password"
                                         size="small"
                                         fullWidth
                                         variant="outlined"
                                         id="newPassword1"
                                         label={translate("New password", lang)}
                                         error={formik.touched.newPassword1 && Boolean(formik.errors.newPassword1)}
                                         helperText={formik.touched.newPassword1 && formik.errors.newPassword1}
                                         {...formik.getFieldProps("newPassword1")}
                                         className={style.field}
                        />
                        <StyledTextField type="password"
                                         size="small"
                                         fullWidth
                                         variant="outlined"
                                         id="newPassword2"
                                         label={translate("Repeat password", lang)}
                                         error={formik.touched.newPassword2 && Boolean(formik.errors.newPassword2)}
                                         helperText={formik.touched.newPassword2 && formik.errors.newPassword2}
                                         {...formik.getFieldProps("newPassword2")}
                                         className={style.field}
                        />
                        <Button type='submit'
                                color="primary"
                                fullWidth
                                variant="contained"
                                className={style.field}
                                disabled={formik.isSubmitting || isLoading}
                        >
                            {translate("Submit", lang)}
                        </Button>
                    </form>
                )
            }
        </div>
    )
}