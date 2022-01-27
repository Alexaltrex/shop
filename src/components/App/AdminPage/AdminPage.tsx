import React, {useState} from "react";
import style from './adminPage.module.scss';
import {Typography} from "@mui/material";
import Divider from "@mui/material/Divider";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import {TabPanel} from "./TabPanel/TabPanel";
import {Categories} from "./Categories/Categories";
import {Products} from "./Products/Products";
import {getUserInfo} from "../../../localStorage/localStorage";
import {Navigate} from "react-router-dom";

const tabs = [
    { label: 'Categories', content: <Categories/>},
    { label: 'Products', content: <Products/>},
];


export const AdminPage = () => {
    const [currentIndex, setСurrentIndex] = useState(0);
    const onChangeHandler = (event: React.SyntheticEvent, newValue: number) => {
        setСurrentIndex(newValue);
    };
    const userInfo = getUserInfo();
    if (!userInfo || (userInfo && userInfo.role !== 'admin')) {
        return <Navigate to="/login"/>
    }

    return (
        <div className={style.adminPage}>
            <Typography component="h1" variant="h5">AdminPage</Typography>
            <Divider sx={{marginTop: '5px'}}/>

            <Tabs value={currentIndex}
                  onChange={onChangeHandler}
                  aria-label="basic tabs example"
                  sx={{
                      marginTop: '10px',
                      '& .MuiTabs-indicator': {
                          height: "4px",
                          //backgroundColor: "darkslategrey"
                      }
                  }}
            >
                {
                    tabs.map(({label}, i) => <Tab key={i} label={label}/>)
                }
            </Tabs>
            <div>
                {
                    tabs.map((el, i) => (
                        <TabPanel key={i} index={i} currentIndex={currentIndex}>
                            {el.content}
                        </TabPanel>
                    ))
                }
            </div>

        </div>
    )
}