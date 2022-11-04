import React from "react";
import {useSelector} from "react-redux";
import {selectCurrentProduct} from "../../../../store/reducers/category.reducer";
import {selectLang} from "../../../../store/reducers/app.reducer";
import {translate} from "../../../../types/lang";

export const ProductCharacteristics = () => {
    const currentProduct = useSelector(selectCurrentProduct);
    const lang = useSelector(selectLang);
    return (
        <div>
            {
                currentProduct && (
                    <>
                        <p>
                            <b>{`${translate("Weight", lang)}: `}</b>
                            <span>{`${currentProduct.weight} ${translate("kg", lang)}`}</span>
                        </p>
                        <p>
                            <b>{`${translate("Description", lang)}: `}</b>
                            <span>{currentProduct.description}</span>
                        </p>
                    </>
                )
            }
        </div>
    )
}