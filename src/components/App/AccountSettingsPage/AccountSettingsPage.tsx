import React, {useState} from "react";
import {getUserInfo} from "../../../localStorage/localStorage";
import {Navigate} from "react-router-dom";
import style from "./accountSettingsPage.module.scss"
import {PersonalData} from "./PersonalData/PersonalData";
import {Security} from "./Security/Security";
import Tab from "@mui/material/Tab";
import {a11yProps} from "../../../helpers/helpers";
import {Tabs} from "@mui/material";
import grey from "@mui/material/colors/grey";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import {TabPanel} from "../../common/TabPanel/TabPanel";
import Typography from "@mui/material/Typography";
import {useSelector} from "react-redux";
import {selectLang} from "../../../store/reducers/app.reducer";
import {translate} from "../../../types/lang";

export const AccountSettingsPage = () => {
    const userInfo = getUserInfo();

    const lang = useSelector(selectLang);

    const tabs = [
        { label: translate("Personal data", lang), content: <PersonalData/>},
        { label: translate("Security", lang), content: <Security/>},
    ];
    const [currentTabIndex, setCurrentTabIndex] = useState(0);
    const onChangeHandler = (event: React.SyntheticEvent, tabIndex: number) => {
        setCurrentTabIndex(tabIndex);
    };

    if (!userInfo) {
        return <Navigate to="/login"/>
    }

    return (
        <section className={style.accountSettingsPage}>
            <div className={style.leftBlock}>

                <div className={style.userInfo}>
                    <AccountCircleIcon sx={{fontSize: 80, color: grey[500]}}/>
                    <p className={style.login}>{userInfo.login}</p>
                    <p className={style.email}>{userInfo.email}</p>
                </div>

                <Tabs value={currentTabIndex}
                      onChange={onChangeHandler}
                      orientation="vertical"
                      aria-label="basic tabs example"
                      className={style.tabs}
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
            </div>

            <div className={style.rightBlock}>
                <Typography variant="h5" component="h2" style={{marginBottom: "20px"}}>
                    {tabs[currentTabIndex].label}
                </Typography>
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



        </section>
    )
}