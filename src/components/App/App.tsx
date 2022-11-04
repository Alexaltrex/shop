import React, {useEffect} from 'react';
import style from './app.module.scss';
import {Header} from "./Header/Header";
import {Route, Routes, useLocation, useSearchParams} from "react-router-dom";
import {Home} from "./Home/Home";
import {ProductPage} from "./ProductPage/ProductPage";
import {ProductsByCategory} from "./ProductsByCategory/ProductsByCategory";
import {ProductsPage} from "./ProductsPage/ProductsPage";
import {ProductsBySearch} from "./ProductsBySearch/ProductsBySearch";
import {RegistrationPage} from "./RegistrationPage/RegistrationPage";
import {LoginPage} from "./LoginPage/LoginPage";
import {AdminPage} from "./AdminPage/AdminPage";
import {BasketPage} from "./BasketPage/BasketPage";
import {AccountSettingsPage} from "./AccountSettingsPage/AccountSettingsPage";
import {InfoPopup} from "../common/InfoPopup/InfoPopup";
import {useDispatch, useSelector} from "react-redux";
import {appAC, selectLang} from "../../store/reducers/app.reducer";
import {LangType} from "../../types/types";
import {serializeSearchParams} from "../../helpers/helpers";


export const App = () => {
    const lang = useSelector(selectLang);

    let [searchParams, setSearchParams] = useSearchParams();
    const dispatch = useDispatch();

    const location = useLocation();
    //console.log(location);

    // URL => STATE
    useEffect(() => {
        const lang = searchParams.get('lang');
        if (lang) {
            dispatch(appAC.setLang(lang as LangType));
        }
    }, []);

    // STATE => URL
    useEffect(() => {
        const nextSearchParams = {...serializeSearchParams(searchParams)};
        nextSearchParams.lang = lang;
        setSearchParams(nextSearchParams);
    }, [lang, location.pathname]);

    return (
        <div className={style.app}>
            <InfoPopup/>
            <Header/>
            <main className={style.main}>
                <Routes>
                    <Route path='/' element={<Home/>}/>
                    <Route path='/basket' element={<BasketPage/>}/>
                    <Route path='/registration' element={<RegistrationPage/>}/>
                    <Route path='/login' element={<LoginPage/>}/>
                    <Route path='/admin' element={<AdminPage/>}/>
                    <Route path='/account-settings' element={<AccountSettingsPage/>}/>
                    <Route path='/products' element={<ProductsPage/>}>
                        <Route path='category' element={<ProductsByCategory/>}/>
                        <Route path='search' element={<ProductsBySearch/>}/>
                    </Route>
                    <Route path='/product' element={<ProductPage/>}/>
                </Routes>
            </main>
        </div>
    );
};

