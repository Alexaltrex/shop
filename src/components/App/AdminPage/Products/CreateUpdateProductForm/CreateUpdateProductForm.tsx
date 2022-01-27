import React, {FC, useEffect} from "react";
import style from './createUpdateProductForm.module.scss';
import {getBrands, selectBrands} from "../../../../../store/reducers/category.reducer";
import {useDispatch, useSelector} from "react-redux";
import {Form, Formik, FormikErrors, FormikHelpers, FormikProps} from "formik";
import {FieldsetCustom} from "../../../../common/FieldsetCustom/FieldsetCustom";
import {FieldText} from "../../../../common/FieldText/FieldText";
import {FieldRadio, IRadioOption} from "../../../../common/FieldRadio/FieldRadio";
import InputAdornment from "@mui/material/InputAdornment";
import {FieldColors} from "../../../../common/FieldColors/FieldColors";
import {FieldSelect, IMenuItem} from "../../../../common/FieldSelect/FieldSelect";
import {Button} from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import ClearIcon from '@mui/icons-material/Clear';
import {IProductUpdateRequest} from "../../../../../api/product.api";

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

interface ICreateUpdateProductForm {
    formTitle: string
    initialValues: IProductUpdate
    onSubmitCustomHandler: (update: IProductUpdateRequest) => void
    onCloseHandler: () => void
}

export const CreateUpdateProductForm: FC<ICreateUpdateProductForm> = ({
                                                                          formTitle,
                                                                          initialValues,
                                                                          onSubmitCustomHandler,
                                                                          onCloseHandler
                                                                      }) => {
    const dispatch = useDispatch();
    useEffect(() => {
            dispatch(getBrands());
    }, []);
    const brandsList = useSelector(selectBrands);
    const menuItemsSelect = brandsList && brandsList.map(el => ({value: el, label: el}));
    const radioOptions: IRadioOption[] = [
        {value: true, label: "true"},
        {value: false, label: "false"},
    ];

    const validate = (values: IProductUpdate): FormikErrors<IProductUpdate> => {
        const errors: FormikErrors<IProductUpdate> = {};
        if (!values.title) {
            errors.title = 'required'
        }
        if (!values.description) {
            errors.description = 'required'
        }
        if (!values.brand) {
            errors.brand = 'required'
        }
        // if (values.colors.length === 0 || values.colors) {
        //     errors.colors = 'required'
        // }
        return errors;
    };
    const onSubmit = async (values: IProductUpdate, formikHelpers: FormikHelpers<IProductUpdate>) => {
        try {
            const update: IProductUpdateRequest = {
                ...values,
                price: Number(values.price),
                quantity: Number(values.quantity),
                weight: Number(values.weight)
            };
            await onSubmitCustomHandler(update);
        } catch (e: any) {
            formikHelpers.setFieldError(e.response.data.error.field, e.response.data.error.value);
        } finally {
            formikHelpers.setSubmitting(false);
        }
    };

    return (
        <>
            {
                brandsList &&
                <Formik
                    initialValues={initialValues}
                    onSubmit={onSubmit}
                    validate={validate}
                >
                    {
                        (props: FormikProps<IProductUpdate>) => (
                            <FieldsetCustom label={formTitle} className={style.fieldsetCustom}>
                                <Form className={style.createUpdateProductForm}>

                                    <div className={style.field}>
                                        <FieldText name="title" label="Title" size="small" placeholder="Enter title"/>
                                    </div>

                                    <div className={style.field}>
                                        <FieldRadio name="available" label="Available" options={radioOptions}/>
                                    </div>

                                    <div className={style.field}>
                                        <FieldText name="price" label="Price" size="small" inputProps={{ step: 1, min: 1, type: 'number' }}
                                                   InputProps={{
                                                       endAdornment: <InputAdornment position="end">₽</InputAdornment>,
                                                   }}
                                        />
                                    </div>

                                    <div className={style.field}>
                                        <FieldColors/>
                                    </div>

                                    <div className={style.field}>
                                        <FieldText name="weight" label="Weight" size="small" inputProps={{ step: 1, min: 1, type: 'number' }}
                                                   InputProps={{
                                                       endAdornment: <InputAdornment position="end">kg</InputAdornment>,
                                                   }}
                                        />
                                    </div>

                                    <div className={style.field}>
                                        <FieldText name="quantity" label="Quantity" size="small" inputProps={{ step: 1, min: 1, type: 'number' }}/>
                                    </div>

                                    <div className={style.field}>
                                        <FieldSelect name="brand" label="Brand" placeholder="Select brand" menuItems={menuItemsSelect as IMenuItem[]}/>
                                    </div>

                                    <div className={style.field}>
                                        <FieldText name="description" label="Description" size="small" multiline placeholder="Enter description"/>
                                    </div>

                                    <div className={style.buttons}>
                                        <Button type='submit'
                                                variant="outlined"
                                                size="small"
                                                style={{textTransform: 'none', alignSelf: 'flex-start'}}
                                                startIcon={<SendIcon/>}
                                                disabled={props.isSubmitting}
                                        >
                                            Submit
                                        </Button>
                                        <Button variant="outlined"
                                                size="small"
                                                color="error"
                                                style={{marginLeft: "10px", textTransform: 'none'}}
                                                onClick={onCloseHandler}
                                                startIcon={<ClearIcon/>}
                                        >
                                            Close
                                        </Button>
                                    </div>
                                </Form>
                            </FieldsetCustom>
                        )
                    }
                </Formik>
            }
        </>
    )
};