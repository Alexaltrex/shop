import React, {useEffect} from "react";
import style from "./personalData.module.scss"
import {Button, TextField} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {FormikHelpers, useFormik} from "formik";
import {authAPI} from "../../../../api/auth.api";
import Typography from "@mui/material/Typography";
import {
    authAC,
    changeNickName,
    getNickName,
    selectLoading,
    selectNickName
} from "../../../../store/reducers/auth.reducer";
import {translate} from "../../../../types/lang";
import {selectLang} from "../../../../store/reducers/app.reducer";

export interface IValues {
    nickName: string
}

export const PersonalData = () => {
    const isLoading = useSelector(selectLoading);
    const nickName = useSelector(selectNickName);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getNickName());
    }, []);


    const initialValues: IValues = {
        nickName,
    };

    const onSubmit = async ({nickName}: IValues, formikHelpers: FormikHelpers<IValues>) => {
        try {
            dispatch(changeNickName(nickName));
        } catch (e: any) {
            console.error(e.message);
            console.error(e.stack);
        } finally {
            dispatch(authAC.setLoading(false));
            formikHelpers.setSubmitting(false);
        }
    };
    const formik = useFormik<IValues>({
        initialValues,
        onSubmit,
        enableReinitialize: true,
    });
    const lang = useSelector(selectLang);

    return (
        <div className={style.personalData}>
            <Typography>{translate("Nickname", lang)}</Typography>
            <form onSubmit={formik.handleSubmit}
                  className={style.form}
            >
                <TextField type="text"
                           size="small"
                           fullWidth
                           variant="outlined"
                           id="nickName"
                           {...formik.getFieldProps("nickName")}
                           className={style.field}
                />
                <Button type='submit'
                        color="primary"
                        fullWidth
                        variant="contained"
                        className={style.field}
                        style={{marginTop: "10px"}}
                        disabled={formik.isSubmitting || isLoading}
                >
                    {translate("Submit", lang)}
                </Button>
            </form>
        </div>
    )
}