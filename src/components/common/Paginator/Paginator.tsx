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
                            sx={{
                                "& .MuiButtonBase-root": {
                                    transition: "0.3s",
                                    "&:hover": {
                                        backgroundColor: "#999999!important",
                                        border: "1px solid #999999!important",
                                        color: "#FFF!important",
                                    }
                                },
                                "& .Mui-selected": {
                                    backgroundColor: "#777777!important",
                                    color: "#FFF!important",
                                    border: "1px solid #777777!important",
                                    "&:hover": {
                                        backgroundColor: "#777!important",
                                    }
                                }
                            }}
                />
            }
        </>
    )
};