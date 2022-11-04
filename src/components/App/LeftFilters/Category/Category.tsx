import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {
    categoryAC,
    selectCategories,
    selectFilterParams
} from "../../../../store/reducers/category.reducer";
import {Select, SelectChangeEvent} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import {ResetButton} from "../../../common/ResetButton/ResetButton";
import {selectLang} from "../../../../store/reducers/app.reducer";
import {translate} from "../../../../types/lang";

export const Category = () => {
    const categories = useSelector(selectCategories);

    const filterParams = useSelector(selectFilterParams);
    const valueGlobal = filterParams.categoryId;

    const [valueLocal, setValueLocal] = useState(filterParams.categoryId);
    const lang = useSelector(selectLang);

    const menuItems = categories && [
        {value: "none", title: translate("all", lang)},
        ...categories.map(category => ({
            value: category.id,
            title: category.title
        })),
    ];

    const dispatch = useDispatch();

    const onChangeHandler = (event: SelectChangeEvent) => {
        setValueLocal(event.target.value !== "none" ? event.target.value : null);
    };

    const onResetHandler = () => setValueLocal(null);

    useEffect(() => {
        dispatch(categoryAC.setFilterParams({
            ...filterParams,
            categoryId: valueLocal,
            page: "1",
        }));
    }, [valueLocal]);

    return (
        <div>
            <ResetButton onResetHandler={onResetHandler}/>
            <div>
                {
                    menuItems && (
                        <Select
                            value={valueGlobal === null ? "none" : valueGlobal}
                            size='small'
                            onChange={onChangeHandler}
                            fullWidth={true}
                            sx={{
                                margin: '5px 0 10px',
                                background: "#FFF",
                                '& .MuiOutlinedInput-notchedOutline': {
                                    border: '2px solid rgba(255,255,255,0.8)',
                                    transition: '0.3s',
                                },
                                '&:hover .MuiOutlinedInput-notchedOutline': {
                                    border: '2px solid orange',
                                },
                                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                    border: '2px solid orange',
                                },
                                '&.Mui-focused:hover .MuiOutlinedInput-notchedOutline': {
                                    border: '2px solid orange',
                                },
                            }}
                        >
                            {
                                menuItems.map(({value, title}) => (
                                    <MenuItem key={value} value={value}>{title}</MenuItem>
                                ))
                            }
                        </Select>
                    )
                }
            </div>
        </div>
    )
}