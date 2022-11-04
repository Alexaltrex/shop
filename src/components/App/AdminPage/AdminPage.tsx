import React, {useState} from "react";
import style from './adminPage.module.scss';
import {Typography} from "@mui/material";
import Divider from "@mui/material/Divider";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import {TabPanel} from "../../common/TabPanel/TabPanel";
import {Categories} from "./Categories/Categories";
import {Products} from "./Products/Products";
import {getUserInfo} from "../../../localStorage/localStorage";
import {Navigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {selectLang} from "../../../store/reducers/app.reducer";
import {translate} from "../../../types/lang";

export const AdminPage = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const onChangeHandler = (event: React.SyntheticEvent, newValue: number) => {
        setCurrentIndex(newValue);
    };
    const userInfo = getUserInfo();
    const lang = useSelector(selectLang);

    const tabs = [
        { label: translate("Categories", lang), content: <Categories/>},
        { label: translate("Products", lang), content: <Products/>},
    ];

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