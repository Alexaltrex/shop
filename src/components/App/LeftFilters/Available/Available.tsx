import React from "react";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import {useDispatch, useSelector} from "react-redux";
import {categoryAC, selectFilterParams} from "../../../../store/reducers/category.reducer";
import {ResetButton} from "../../../common/ResetButton/ResetButton";
import {selectLang} from "../../../../store/reducers/app.reducer";
import {translate} from "../../../../types/lang";

// 1 - изменение в ui => изменение локальной переменной
// 2 - изменение локальной переменной переменной => изменение глобальной переменной (+ сброс page)
// 3 - значение в ui - значение глобальной переменной (позволяет делать сброс извне)

export const Available = () => {
    const dispatch = useDispatch();
    const filterParams = useSelector(selectFilterParams);

    const sxRadio = {
        color: '#FFF',
        '&.Mui-checked': {
            color: 'orange',
        },
        '& .MuiSvgIcon-root': {
            fontSize: 16,
        },
    };

    const lang = useSelector(selectLang);
    const labels = [
        {value: translate("all", lang), label: 'All'},
        {value: translate("true", lang), label: 'Yes'},
        {value: translate("false", lang), label: 'No'},
    ];

    const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>, value: string) => {
        dispatch(categoryAC.setFilterParams({
            ...filterParams,
            available: value,
            page: "1",
        }));
    };

    const onResetHandler = () => {
        dispatch(categoryAC.setFilterParams({
            ...filterParams,
            available: "all",
            page: "1",
        }));
    };

    return (
        <div>
            <ResetButton onResetHandler={onResetHandler}/>

            <FormControl component="fieldset">
                <RadioGroup
                    aria-label="gender"
                    value={filterParams.available}
                    name="radio-buttons-group"
                    onChange={onChangeHandler}
                >
                    {
                        labels.map(el => (
                            <FormControlLabel key={el.value}
                                              value={el.value}
                                              control={ <Radio sx={sxRadio} /> }
                                              label={el.label}
                            />
                        ))
                    }
                </RadioGroup>
            </FormControl>
        </div>
    )
};