import {useField} from "formik";
import React from "react";
import {TextField, TextFieldProps} from "@mui/material";
import style from './fieldText.module.scss';

type FieldTextType = {
    name: string
} & TextFieldProps

export const FieldText: React.FC<FieldTextType> = ({name, ...props}) => {
    const [
        field,
        meta,
        helpers
    ] = useField(name);

    return (
        <TextField //type="text"
                   variant="outlined"
                   id={field.name}
                   name={field.name}
                   helperText={meta.touched && meta.error}
                   value={field.value}
                   onChange={field.onChange}
                   onBlur={field.onBlur}
                   error={meta.touched && Boolean(meta.error)}
                   className={style.fieldText}
                   {...props}
        />

    )
};





