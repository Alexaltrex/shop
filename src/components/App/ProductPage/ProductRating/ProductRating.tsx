import React, {SyntheticEvent, useEffect, useState} from "react";
import style from "./productRating.module.scss"
import {Rating} from "@mui/material";
import RateReviewIcon from '@mui/icons-material/RateReview';
import ClearIcon from '@mui/icons-material/Clear';
import Button from "@mui/material/Button";
import {getUserInfo} from "../../../../localStorage/localStorage";
import {useDispatch, useSelector} from "react-redux";
import {
    getRatedProducts,
    reviewProduct,
    selectCurrentProduct,
    selectRatedProducts
} from "../../../../store/reducers/category.reducer";
import {Form, Formik, FormikErrors, FormikHelpers, FormikProps} from "formik";
import {FieldText} from "../../../common/FieldText/FieldText";
import SendIcon from "@mui/icons-material/Send";
import {ReviewItem} from "./ReviewItem/ReviewItem";
import {translate} from "../../../../types/lang";
import {selectLang} from "../../../../store/reducers/app.reducer";

interface IValues {
    review: string
}

export const ProductRating = () => {
    const currentProduct = useSelector(selectCurrentProduct);
    const ratedProducts = useSelector(selectRatedProducts);
    const [showForm, setShowForm] = useState(false);

    const rating = currentProduct ? currentProduct.rating : null;
    const rate = currentProduct ? currentProduct.rate : null;
    const count = rating && Object.values(rating).reduce((prev, curr) => prev + curr);

    const userInfo = getUserInfo();
    const [value, setValue] = useState<number | null>(3);

    const dispatch = useDispatch();

    useEffect(() => {
        if (userInfo && userInfo.role === "user") {
            dispatch(getRatedProducts());
        }
    }, []);

    const onChangeHandler = (event: SyntheticEvent, newValue: number | null) => {
        setValue(newValue);
    }
    const initialValues: IValues = {
        review: ""
    }
    const onSubmit = (values: IValues, formikHelpers: FormikHelpers<IValues>) => {
        try {
            setShowForm(false);
            currentProduct && value &&
            dispatch(reviewProduct(currentProduct.id, value, values.review));
        } catch (e: any) {
            //formikHelpers.setFieldError(e.response.data.error.field, e.response.data.error.value);
        } finally {
            formikHelpers.setSubmitting(false);
            setShowForm(false);
        }
    }
    const validate = (values: IValues): FormikErrors<IValues> => {
        const errors: FormikErrors<IValues> = {};
        if (!values.review) {
            errors.review = 'required'
        }
        return errors;
    }
    const lang = useSelector(selectLang);

    return (
        <div className={style.productRating}>
            {
                rating && rate && count && (
                    <div className={style.ratingInfo}>
                        <div className={style.leftBlock}>
                            <p className={style.rate}>{rate}</p>
                            <p>{`${translate("based on", lang)} ${count} ${translate("reviews", lang)}`}</p>
                            <Rating value={Number(rate)}
                                    readOnly
                            />
                        </div>
                        <div className={style.rightBlock}>
                            {
                                [...Object.keys(rating)].map((key, index) => (
                                    <div className={style.item} key={index}>
                                        <p className={style.key}>{key}</p>
                                        <div className={style.line}>
                                            <div className={style.innerLine}
                                                 style={{
                                                     width: `${
                                                         count === 0
                                                             ? 0
                                                             : Math.round(100 * Object.values(rating)[index] / count)
                                                     }%`
                                                 }}
                                            />
                                        </div>
                                        <p className={style.procent}>{`${
                                            count === 0
                                                ? 0
                                                : Math.round(100 * Object.values(rating)[index] / count)
                                        }%`}</p>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                )
            }

            {
                userInfo &&
                userInfo.role === "user" &&
                currentProduct &&
                ratedProducts &&
                <>
                    {
                        !ratedProducts.hasOwnProperty(currentProduct.id) && ( // продукт еще не оценен
                            <div className={style.addReviewBlock}>
                                <Button variant="contained"
                                        onClick={() => setShowForm(!showForm)}
                                        startIcon={showForm ? <ClearIcon/> : <RateReviewIcon/>}
                                >
                                    {showForm ? translate("Cancel", lang) : translate("Add review", lang)}
                                </Button>
                                {
                                    showForm && (
                                        <>
                                            <div className={style.ratingWrapper}>
                                                <Rating
                                                    value={value}
                                                    onChange={onChangeHandler}
                                                    sx={{color: "rgb(255,30,30)"}}
                                                />
                                            </div>
                                            <Formik initialValues={initialValues}
                                                    onSubmit={onSubmit}
                                                    validate={validate}
                                            >
                                                {
                                                    (props: FormikProps<IValues>) => (
                                                        <Form className={style.form}>
                                                            <FieldText name="review" multiline
                                                                       placeholder="Write your review"/>
                                                            <Button type="submit"
                                                                    variant="outlined"
                                                                    startIcon={<SendIcon/>}
                                                                    disabled={props.isSubmitting}
                                                            >
                                                                Add review
                                                            </Button>
                                                        </Form>
                                                    )
                                                }
                                            </Formik>


                                        </>
                                    )

                                }
                            </div>
                        )
                    }

                    <div className={style.listOfReviews}>
                        {
                            currentProduct.reviews.map(review => <ReviewItem key={review.id} {...review}/>)
                        }
                    </div>
                </>
            }
        </div>
    )
}