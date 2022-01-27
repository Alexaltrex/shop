import React from "react";
import style from './header.module.scss';
import {Link, useLocation, useNavigate} from "react-router-dom";
import {Logo} from "./Logo/Logo";
import Button from "@mui/material/Button";
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import {useDispatch, useSelector} from "react-redux";
import {appAC, selectCatalogOpen} from "../../../store/reducers/app.reducer";
import clsx from "clsx";
import {SearchForm} from "./SearchForm/SearchForm";
import {Auth} from "./Auth/Auth";
import {getUserInfo} from "../../../localStorage/localStorage";

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
                    >
                        Catalog
                    </Button>
                }
                <SearchForm/>
            </div>

            <div className={style.rightBlock}>
                {
                    userInfo && userInfo.role === 'admin' &&
                    <Button variant="outlined"
                            size="small"
                            style={{textTransform: "none"}}
                            sx={sxAdminButton}
                            startIcon={<ModeEditIcon/>}
                            onClick={onAdminHandler}
                    >
                        Admin panel
                    </Button>
                }
                <Auth/>
            </div>

        </header>
    )
};