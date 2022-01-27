import {useField} from "formik";
import React, {FC} from "react";
import {SelectProps} from "@mui/material/Select";
import {colors} from "../../../constants/constants";
import style from "./fieldColors.module.scss"
import clsx from "clsx";
import {FieldsetCustom} from "../FieldsetCustom/FieldsetCustom";

type FieldColorsType = {} & SelectProps;

export const FieldColors: FC<FieldColorsType> = ({}) => {
    const [field, meta, helpers] = useField({
        name: 'colors',
        validate: (value: any) => {
            if (!value || value.length === 0) {
                return "required"
            }
            return undefined
        }
    });

    return (
        <FieldsetCustom label="Colors"
                        error={meta.touched && Boolean(meta.error)}
                        className={style.fieldColors}
        >
            <input type="text"
                   multiple
                   name='colors'
                   value={field.value}
                   onChange={field.onChange}
                   className={style.input}
            />
            <div className={style.items}>
                {
                    colors.map(color => (
                        <div className={clsx({
                            [style.item]: true,
                            [style.item_selected]: field.value.includes(color),
                        })}
                             key={color}

                             onClick={() => {
                                 helpers.setTouched(true);
                                 if (field.value.includes(color)) {
                                     helpers.setValue([...field.value].filter(el => el !== color));
                                 } else {
                                     helpers.setValue([...field.value, color])
                                 }
                             }}
                        >
                            <div className={style.itemInner} style={{background: color}}/>
                        </div>
                    ))
                }
            </div>
            <p className={style.formHelperText}>
                {meta.touched && meta.error}
            </p>
        </FieldsetCustom>
    )
}