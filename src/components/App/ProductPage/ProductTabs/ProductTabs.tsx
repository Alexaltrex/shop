import React, {FC, useState} from "react";
import {Tabs} from "@mui/material";
import Tab from "@mui/material/Tab";
import {a11yProps} from "../../../../helpers/helpers";
import {TabPanel} from "../../../common/TabPanel/TabPanel";
import style from "./productTabs.module.scss"
import {ProductCharacteristics} from "../ProductCharacteristics/ProductCharacteristics";
import {ProductRating} from "../ProductRating/ProductRating";
import {useSelector} from "react-redux";
import {selectLang} from "../../../../store/reducers/app.reducer";
import {translate} from "../../../../types/lang";

export const ProductTabs = () => {
    const lang = useSelector(selectLang);
    const tabs = [
        { label: translate("Characteristics", lang), content: <ProductCharacteristics/> },
        { label: translate("Rating and reviews", lang), content: <ProductRating/> },
    ];

    const [currentTabIndex, setCurrentTabIndex] = useState(0);

    const onChangeHandler = (event: React.SyntheticEvent, tabIndex: number) => {
        setCurrentTabIndex(tabIndex);
    };

    return (
        <div>
            <Tabs value={currentTabIndex}
                  onChange={onChangeHandler}
                  aria-label="basic tabs example"
            >
                {
                    tabs.map(({label}, index) => (
                        <Tab key={index}
                             label={label}
                             {...a11yProps(index)}
                            sx={{
                                textTransform: "none"
                            }}
                        />
                        ))
                }
            </Tabs>
            <div className={style.tabPanelWrapper}>
                {
                    tabs.map((el, i) => (
                        <TabPanel key={i}
                                  index={i}
                                  currentIndex={currentTabIndex}
                        >
                            {el.content}
                        </TabPanel>
                    ))
                }
            </div>
        </div>
    )
}