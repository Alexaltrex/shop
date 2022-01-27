import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getCategories, selectCategories} from "../../../../store/reducers/category.reducer";
import {Tabs} from "@mui/material";
import Tab from "@mui/material/Tab";
import style from './products.module.scss';
import {TabPanel} from "../TabPanel/TabPanel";
import {ProductsOfCategory} from "./ProductsOfCategory/ProductsOfCategory";

function a11yProps(index: number) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}

export const Products = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getCategories)
    }, []);
    const categories = useSelector(selectCategories);
    const [currentIndex, setCurrentIndex] = useState(0);
    const onChangeHandler = (event: React.SyntheticEvent, newValue: number) => {
        setCurrentIndex(newValue);
    };

    return (
        <div className={style.products}>
            {
                categories &&
                <>
                    <Tabs
                        orientation="vertical"
                        value={currentIndex}
                        onChange={onChangeHandler}
                        aria-label="Vertical tabs example"
                        sx={{
                            borderRight: 1,
                            borderColor: 'divider',
                            '& .MuiTabs-indicator': {
                                width: "4px",
                                //backgroundColor: "darkslategrey"
                            }
                        }}
                    >
                        {
                            categories.map((category, index) => (
                                <Tab label={category.title}
                                     key={index}
                                     {...a11yProps(index)}
                                    sx={{textTransform: 'none'}}
                                />
                            ))
                        }
                    </Tabs>
                    <div>
                        {
                            categories.map((category, index) => (
                                <TabPanel key={index} index={index} currentIndex={currentIndex}>
                                    <ProductsOfCategory category={category} show={index === currentIndex}/>
                                </TabPanel>
                            ))
                        }
                    </div>
                </>
            }
        </div>
    )
};