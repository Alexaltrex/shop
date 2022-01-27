import {Pagination} from "@mui/material";
import React, {FC} from "react";
import {useDispatch, useSelector} from "react-redux";
import {categoryAC, selectFilterParams} from "../../../store/reducers/category.reducer";

interface IPaginator {
    pageCount: number
}

export const Paginator: FC<IPaginator> = ({pageCount}) => {
    const filterParams = useSelector(selectFilterParams);
    const currentPage = Number(useSelector(selectFilterParams).page) || 1;
    const dispatch = useDispatch();
    const onChangeHandler = (event: React.ChangeEvent<unknown>, page: number) => {
        dispatch(categoryAC.setFilterParams({...filterParams, page: String(page)}))
    };

    return (
        <>
            {
                pageCount !== 0 &&
                <Pagination count={pageCount}
                            variant="outlined"
                            shape="rounded"
                            onChange={onChangeHandler}
                            page={currentPage}
                            style={{marginTop: 10}}
                />
            }
        </>
    )
};