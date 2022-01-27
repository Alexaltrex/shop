import React, {FC, useEffect, useState} from "react";
import {IProduct} from "../../../../../types/types";
import style from './productItem.module.scss';
import {Button} from "@mui/material";
import {Form, Formik, FormikErrors, FormikHelpers, FormikProps} from "formik";
import {useDispatch, useSelector} from "react-redux";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ClearIcon from '@mui/icons-material/Clear';
import EditIcon from '@mui/icons-material/Edit';
import SendIcon from '@mui/icons-material/Send';
import {
    getBrands,
    getCategories,
    getProductsByCategoryId,
    selectBrands
} from "../../../../../store/reducers/category.reducer";
import {FieldRadio, IRadioOption} from "../../../../common/FieldRadio/FieldRadio";
import {FieldText} from "../../../../common/FieldText/FieldText";
import {FieldSelect, IMenuItem} from "../../../../common/FieldSelect/FieldSelect";
import {FieldsetCustom} from "../../../../common/FieldsetCustom/FieldsetCustom";
import InputAdornment from "@mui/material/InputAdornment";
import {FieldColors} from "../../../../common/FieldColors/FieldColors";
import {IProductUpdateRequest, productAPI} from "../../../../../api/product.api";
import {CreateUpdateProductForm} from "../CreateUpdateProductForm/CreateUpdateProductForm";

interface IProductItem {
    product: IProduct
}

export interface IProductUpdate {
    title: string
    available: boolean
    quantity: string
    brand: string
    price: string
    weight: string
    description: string
    colors: string[]
}

export const ProductItem: FC<IProductItem> = ({product}) => {
    const [showForm, setShowForm] = useState(false);

    const onRenameHandler = () => setShowForm(!showForm);

    const initialValues: IProductUpdate = {
        title: product.title,
        available: product.available,
        quantity: String(product.quantity),
        price: String(product.price),
        weight: String(product.weight),
        description: product.description,
        brand: product.brand,
        colors: product.colors
    };

    const dispatch = useDispatch();

    const onDeleteHandler = async () => {
        try {
            await productAPI.delete(product.id);
            console.log(product);
            dispatch(getProductsByCategoryId(product.category.id));
        } catch (e) {

        }
    };

    const onSubmitCustomHandler = async (update: IProductUpdateRequest) => {
        await productAPI.update(product.id, update);
        dispatch(getProductsByCategoryId(product.category.id));
        setShowForm(false);
    };

    return (
        <div className={style.productItem}>
            <div className={style.header}>
                <div className={style.titleBlock}>
                    <p>title:</p>
                    <p>{product.title}</p>
                </div>
                <Button variant="outlined"
                        size="small"
                        color={showForm ? "error" : "primary"}
                        style={{marginLeft: "10px", textTransform: 'none'}}
                        onClick={onRenameHandler}
                        startIcon={showForm ? <ClearIcon/> : <EditIcon/>}
                >
                    {showForm ? 'Close' : 'Edit'}
                </Button>

                <Button variant="outlined"
                        color="error"
                        size="small"
                        style={{marginLeft: "10px", textTransform: 'none'}}
                        startIcon={<DeleteForeverIcon/>}
                        onClick={onDeleteHandler}
                >
                    Delete
                </Button>
            </div>

            {
                showForm && <div style={{display: "flex", flexDirection: "column", marginBottom: "10px"}}>
                    <CreateUpdateProductForm formTitle="Edit product form"
                                             initialValues={initialValues}
                                             onSubmitCustomHandler={onSubmitCustomHandler}
                                             onCloseHandler={() => setShowForm(false)}
                    />
                </div>

            }
        </div>
    )
};