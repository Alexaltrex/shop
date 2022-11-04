import React, {useEffect, useState} from "react";
import style from './price.module.scss';
import {Slider} from "@mui/material";
import Input from "@mui/material/Input";
import {useDispatch, useSelector} from "react-redux";
import {
    categoryAC,
    selectFilterParams,
    selectPriceMaxLocal, selectPriceMinLocal
} from "../../../../store/reducers/category.reducer";
import {productAPI} from "../../../../api/product.api";

const sxSlider = {
    '& .MuiSlider-rail': {
        height: '2px',
        background: 'rgba(255,255,255,0.9)'
    },
    '& .MuiSlider-track': {
        height: '3px',
        background: '#FFF',
        border: 'none',
    },
    '& .MuiSlider-thumb': {
        height: '16px',
        width: '16px',
        background: '#FFF',
        '&:hover': {
            boxShadow: '0px 0px 0px 8px rgba(255,255,255,0.1)'
        },
    },
    '& .MuiSlider-valueLabel': {
        padding: '2px',
        background: '#FFF',
        color: '#000',
        '&::before': {
            background: '#FFF',
        }
    }
};

export const Price = () => {
    const [isChanging, setIsChanging] = useState(false);
    const filterParams = useSelector(selectFilterParams);
    const dispatch = useDispatch();

    const minMaxPrice = localStorage.getItem("minMaxPrice")
        ? JSON.parse(localStorage.getItem("minMaxPrice") as string)
        : null;

    // @ts-ignore
    useEffect(async () => {
        try {
            // если minMaxPrice нет в локальном хранилище - делаем запрос к апи
            if (!localStorage.getItem("minMaxPrice")) {
                const response = await productAPI.getMinMaxPrice();
                const minMaxPrice = response.data;
                localStorage.setItem("minMaxPrice", JSON.stringify(minMaxPrice));
                dispatch(categoryAC.setFilterParams({
                    ...filterParams,
                    priceMin: String(minMaxPrice.priceMin),
                    priceMax: String(minMaxPrice.priceMax),
                    page: "1",
                }));
                dispatch(categoryAC.setPriceMinLocal(minMaxPrice.priceMin));
                dispatch(categoryAC.setPriceMaxLocal(minMaxPrice.priceMax));
            }
        } catch (e) {
        }
    }, []);

    const priceMinLocal = useSelector(selectPriceMinLocal);
    const priceMaxLocal = useSelector(selectPriceMaxLocal);

    useEffect(() => {
        if (!isChanging) {
            dispatch(categoryAC.setFilterParams({
                ...filterParams,
                priceMin: priceMinLocal as string,
                priceMax: priceMaxLocal as string,
                page: "1",
            }));
        }
    }, [isChanging]);

    const sliderChangeHandler = (event: Event, newValue: number | number[]) => {
        dispatch(categoryAC.setPriceMinLocal((newValue as number[])[0]));
        dispatch(categoryAC.setPriceMaxLocal((newValue as number[])[1]));
    };

    const inputStartChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(categoryAC.setPriceMinLocal(event.target.value === '' ? '' : Number(event.target.value)));
    };

    const inputEndChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(categoryAC.setPriceMaxLocal(event.target.value === '' ? '' : Number(event.target.value)));
    };

    const onMouseDownHandler = (e: any) => setIsChanging(true);
    const onMouseUpHandler = (e: any) => setIsChanging(false);

    return (
        <div className={style.price}>
            {
                minMaxPrice &&
                <>
                    <div className={style.sliderWrapper}>
                        <Slider
                            value={[
                                //typeof priceMinLocal === 'number' ? priceMinLocal : 1,
                                Number(priceMinLocal),
                                typeof priceMaxLocal === 'number' ? priceMaxLocal : 100
                            ]}
                            onChange={sliderChangeHandler}
                            aria-labelledby="input-slider"
                            valueLabelDisplay='on'
                            min={minMaxPrice.priceMin}
                            max={minMaxPrice.priceMax}
                            onMouseDown={onMouseDownHandler}
                            onMouseUp={onMouseUpHandler}
                            sx={sxSlider}
                        />
                    </div>

                    <div className={style.inputWrapper}>
                        <Input
                            value={priceMinLocal}
                            size="small"
                            onChange={inputStartChangeHandler}
                            onMouseDown={onMouseDownHandler}
                            onMouseUp={onMouseUpHandler}
                            inputProps={{
                                step: 1,
                                min: minMaxPrice.priceMin,
                                max: minMaxPrice.priceMax,
                                type: 'number',
                                'aria-labelledby': 'input-slider',
                            }}
                            sx={{
                                background: '#FFF',
                                paddingLeft: '5px',
                            }}
                        />
                        <Input
                            value={priceMaxLocal}
                            size="small"
                            onChange={inputEndChangeHandler}
                            onMouseDown={onMouseDownHandler}
                            onMouseUp={onMouseUpHandler}
                            inputProps={{
                                step: 1,
                                min: minMaxPrice.priceMin,
                                max: minMaxPrice.priceMax,
                                type: 'number',
                                'aria-labelledby': 'input-slider',
                            }}
                            sx={{
                                background: '#FFF',
                                paddingLeft: '5px',
                            }}
                        />
                    </div>
                </>
            }
        </div>
    )
}