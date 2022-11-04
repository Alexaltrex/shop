import React from "react";
import style from './header.module.scss';
import {Link, useLocation, useNavigate} from "react-router-dom";
import {Logo} from "./Logo/Logo";
import Button from "@mui/material/Button";
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import {useDispatch, useSelector} from "react-redux";
import {appAC, selectCatalogOpen, selectLang} from "../../../store/reducers/app.reducer";
import clsx from "clsx";
import {SearchForm} from "./SearchForm/SearchForm";
import {Auth} from "./Auth/Auth";
import {getUserInfo} from "../../../localStorage/localStorage";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import green from "@mui/material/colors/green";
import {LangSwitcher} from "./LangSwitcher/LangSwitcher";
import {translate} from "../../../types/lang";

const sxAdminButton = {
    color: 'rgba(255,255,255,0.6)',
    border: '1px solid rgba(255,255,255,0.6)',
    transition: '0.3s',
    marginRight: '10px',
    '&:hover': {
        border: '1px solid white',
        color: 'white'
    },
};

export const Header = () => {
    const {pathname} = useLocation();
    const catalogIsHide = pathname === '/';
    const catalogOpen = useSelector(selectCatalogOpen);
    const userInfo = getUserInfo();
    let navigate = useNavigate();

    const dispatch = useDispatch();
    const onCatalogButtonHandler = () => dispatch(appAC.setCatalogOpen(!catalogOpen));
    const onAdminHandler = () => {
        navigate('admin');
    };
    const lang = useSelector(selectLang);

    return (
        <header className={style.header}>
            <div className={style.leftBlock}>
                <Link to='/' className={style.logo}>
                    <Logo/>
                </Link>
                {
                    !catalogIsHide &&
                    <Button variant='contained'
                            className={clsx({
                                [style.catalogButton]: true,
                                [style.catalogButton_open]: catalogOpen,
                            })}
                            endIcon={<ArrowUpwardIcon fontSize='small'/>}
                            onClick={onCatalogButtonHandler}
                            sx={{width: 110}}
                    >
                        {translate("Catalog", lang)}
                    </Button>
                }
                <SearchForm/>
                <LangSwitcher/>
            </div>

            <div className={style.rightBlock}>

                {/*<p className={style.version}>ver. 07.02.2022 22:10</p>*/}

                {
                    userInfo && userInfo.role === 'user' && (
                        <Link className={style.basketWrapper}
                              to='/basket'
                        >
                            <ShoppingCartIcon sx={{color: green[500]}}/>
                            <p className={style.title}>
                                {translate("Basket", lang)}
                            </p>
                        </Link>
                    )
                }

                {
                    userInfo && userInfo.role === 'admin' &&
                    <Button variant="outlined"
                            size="small"
                            style={{textTransform: "none"}}
                            sx={sxAdminButton}
                            startIcon={<ModeEditIcon/>}
                            onClick={onAdminHandler}
                    >
                        {translate("Admin panel", lang)}
                    </Button>
                }

                <Auth/>
            </div>

        </header>
    )
};