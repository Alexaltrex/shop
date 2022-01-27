import React, {FC, useState} from "react";
import style from './addProduct.module.scss';
import AddBoxIcon from '@mui/icons-material/AddBox';
import ClearIcon from '@mui/icons-material/Clear';
import {Button} from "@mui/material";
import {CreateUpdateProductForm} from "../CreateUpdateProductForm/CreateUpdateProductForm";
import {IProductUpdate} from "../ProductItem/ProductItem";
import {IProductUpdateRequest, productAPI} from "../../../../../api/product.api";
import {useDispatch} from "react-redux";
import {getProductsByCategoryId} from "../../../../../store/reducers/category.reducer";

interface IAddProduct {
    categoryId: string
}

export const AddProduct: FC<IAddProduct> = ({categoryId}) => {
    const [showForm, setShowForm] = useState(false);
    const dispatch = useDispatch();

    const onClickHandler = () => {
        setShowForm(!showForm);
    };

    const initialValues: IProductUpdate = {
        title: "Product title",
        available: true,
        quantity: "1",
        price: "1",
        weight: "1",
        description: "Enter description",
        brand: '',
        colors: []
    };

    const onSubmitCustomHandler = async (update: IProductUpdateRequest) => {
        //console.log(update);
        await productAPI.create(categoryId, update);
        dispatch(getProductsByCategoryId(categoryId));
        setShowForm(false);
    };

    return (
        <div className={style.addProduct}>
            <Button variant={showForm ? "outlined" : "contained"}
                    color={showForm ? "error" : "success"}
                    size="small"
                    style={{textTransform: 'none'}}
                    startIcon={showForm ? <ClearIcon/> : <AddBoxIcon/>}
                    onClick={onClickHandler}
            >
                {showForm ? 'Close' : 'Add product'}
            </Button>
            {
                showForm && (
                    <div style={{ display: "flex", flexDirection: "column", marginTop: "10px"}}>
                        <CreateUpdateProductForm formTitle="Add product form"
                                                 initialValues={initialValues}
                                                 onSubmitCustomHandler={onSubmitCustomHandler}
                                                 onCloseHandler={() => setShowForm(false)}
                        />
                    </div>
                )
            }
        </div>
    )
}