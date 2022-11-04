import {RadioGroupProps} from "@mui/material";
import React, {FC} from "react";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import {useField} from "formik";
import {FieldsetCustom} from "../FieldsetCustom/FieldsetCustom";

export interface IRadioOption {
    value: boolean
    label: string
}

interface IFieldRadio extends RadioGroupProps {
    label: string
    name: string
    options: IRadioOption[]
}

export const FieldRadio: FC<IFieldRadio> = ({
                                                label,
                                                name,
                                                options,
                                            }) => {
    const [
        field,
        meta,
        helpers
    ] = useField(name);

    return (
        <FieldsetCustom label={label}>
            <RadioGroup name={field.name}
                        value={field.value}
                        onChange={field.onChange}
                        sx={{ flexDirection: "row"}}
            >
                {
                    options.map(({value, label}) => (
                            <FormControlLabel key={label}
                                              value={value}
                                              control={<Radio/>}
                                              label={label}
                            />
                        )
                    )
                }
            </RadioGroup>
        </FieldsetCustom>
    )
};