import React from "react";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import {useDispatch, useSelector} from "react-redux";
import {categoryAC, selectFilterParams} from "../../../../store/reducers/category.reducer";
import {ResetButton} from "../../../common/ResetButton/ResetButton";

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

    const labels = [
        {value: 'all', label: 'All'},
        {value: 'true', label: 'Yes'},
        {value: 'false', label: 'No'},
    ];

    const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>, value: string) => {
        dispatch(categoryAC.setFilterParams({...filterParams, available: value}));
    };

    const onResetHandler = () => dispatch(categoryAC.setFilterParams({...filterParams, available: 'all'}));

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
                                              control={
                                                  <Radio
                                                      //size='small'
                                                      sx={sxRadio}
                                                  />
                                              }
                                              label={el.label}
                            />
                        ))
                    }
                </RadioGroup>
            </FormControl>
        </div>

    )
};