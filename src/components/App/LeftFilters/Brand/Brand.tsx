import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {categoryAC, getBrands, selectBrands, selectFilterParams} from "../../../../store/reducers/category.reducer";
import {FormControl, Select, SelectChangeEvent, Theme} from "@mui/material";
import OutlinedInput from "@mui/material/OutlinedInput";
import Chip from "@mui/material/Chip";
import MenuItem from "@mui/material/MenuItem";
import useTheme from "@mui/material/styles/useTheme";
import Checkbox from "@mui/material/Checkbox";
import ListItemText from "@mui/material/ListItemText";
import style from './brand.module.scss';
import {ResetButton} from "../../../common/ResetButton/ResetButton";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        },
    },
};

function getStyles(name: string, personName: readonly string[], theme: Theme) {
    return {
        fontWeight:
            personName.indexOf(name) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
}

export const Brand = () => {
    const brandsList = useSelector(selectBrands);
    const filterParams = useSelector(selectFilterParams);
    const brands = filterParams.brands;

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getBrands());
    }, []);

    const onChangeHandler = (event: SelectChangeEvent<typeof brands>) => {
        const {
            target: {value},
        } = event;
        dispatch(categoryAC.setFilterParams({
            ...filterParams,
            brands: typeof value === 'string' ? value.split(',') : value
        }));
    };
    const theme = useTheme();

    const onResetHandler = () => dispatch(categoryAC.setFilterParams({...filterParams, brands: []}));
    return (
        <div className={style.brand}>
            <ResetButton onResetHandler={onResetHandler}/>
            <div>
                {
                    brandsList &&
                    <FormControl sx={{width: '100%'}}>
                        <div className={style.chips}>
                            {
                                brands.map(brand => (
                                        <Chip key={brand}
                                              label={brand}
                                              onDelete={
                                                  () => dispatch(
                                                      categoryAC.setFilterParams({
                                                          ...filterParams,
                                                          brands: [...brands].filter(el => el !== brand)
                                                      })
                                                  )
                                              }
                                              sx={{
                                                  background: '#FFF',
                                                  marginBottom: '5px',
                                                  '& .MuiChip-label': {
                                                      padding: '0 8px',
                                                  }
                                              }}
                                        />
                                    )
                                )
                            }
                        </div>
                        <Select
                            labelId="Brand"
                            id="Brand-multiple-chip"
                            multiple
                            size='small'
                            placeholder="Select brand"
                            value={brands}
                            onChange={onChangeHandler}
                            input={
                                <OutlinedInput id="select-multiple-chip"
                                               sx={{
                                                   margin: '5px 0 10px',
                                                   background: '#FFF',
                                                   '& .MuiOutlinedInput-notchedOutline': {
                                                       border: '2px solid rgba(255,255,255,0.8)',
                                                       transition: '0.3s',
                                                   },
                                                   '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                                       border: '2px solid orange',
                                                   },
                                                   '&.Mui-focused:hover .MuiOutlinedInput-notchedOutline': {
                                                       border: '2px solid orange',
                                                   },
                                                   '&:hover .MuiOutlinedInput-notchedOutline': {
                                                       border: '2px solid white',
                                                   },
                                               }}
                                />
                            }
                            renderValue={
                                (selected) => "Select brand"//selected.join(', ')
                            }
                            MenuProps={MenuProps}
                        >
                            {brandsList.map((brand) => (
                                <MenuItem
                                    key={brand}
                                    value={brand}
                                    style={getStyles(brand, brands, theme)}
                                >
                                    <Checkbox checked={brands.indexOf(brand) > -1}/>
                                    <ListItemText primary={brand}/>
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                }
            </div>

        </div>
    )
};