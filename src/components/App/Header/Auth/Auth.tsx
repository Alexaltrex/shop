import Button from "@mui/material/Button";
import React, {useEffect} from "react";
import {getUserInfo, removeUserInfo} from "../../../../localStorage/localStorage";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import {Typography} from "@mui/material";
import Popover from "@mui/material/Popover";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import green from "@mui/material/colors/green";
import red from "@mui/material/colors/red";
import {useNavigate} from "react-router";
import {useDispatch, useSelector} from "react-redux";
import {getNickName, selectNickName} from "../../../../store/reducers/auth.reducer";
import {translate} from "../../../../types/lang";
import {selectLang} from "../../../../store/reducers/app.reducer";

const sxListItemIcon = {minWidth: 0, marginRight: "10px"};

export const Auth = () => {
    let navigate = useNavigate();
    const userInfo = getUserInfo();
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const onClickHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const onCloseHandler = () => {
        setAnchorEl(null);
    };

    const onLoginOpenHandler = () => {
        setAnchorEl(null);
        navigate('/login');
    };

    const onLogoutHandler = () => {
        removeUserInfo();
        setAnchorEl(null);
        navigate('/');
    };

    const onRegisterOpenHandler = () => {
        navigate('/registration');
        setAnchorEl(null);
    };

    const onSettingHandler = () => {
        navigate('/account-settings');
        setAnchorEl(null);
    };

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getNickName());
    }, []);
    const nickName = useSelector(selectNickName);
    const lang = useSelector(selectLang);

    return (
        <div>
            <Button sx={{color: 'white', textTransform: 'none'}}
                    startIcon={<AccountCircleIcon fontSize='large' sx={{ color: userInfo ? green[500] : red[500] }}/>}
                    endIcon={<ExpandMoreIcon/>}
                    aria-controls="simple-menu"
                    aria-haspopup="true"
                    onClick={onClickHandler}
            >
                {
                    userInfo &&
                    <Typography color='common.white'>
                        { nickName ? nickName : userInfo.login}
                    </Typography>
                }
            </Button>
            <Popover
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={onCloseHandler}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
            >
                <List sx={{padding: 0}}>
                    {
                        !userInfo &&
                        <ListItem onClick={onLoginOpenHandler}
                                  button
                        >
                            <ListItemIcon sx={sxListItemIcon}>
                                <ExitToAppIcon sx={{color: green[500]}}/>
                            </ListItemIcon>
                            <ListItemText primary={translate("Login", lang)}/>
                        </ListItem>
                    }

                    {
                        !userInfo &&
                        <ListItem onClick={onRegisterOpenHandler}
                                  button
                        >
                            <ListItemIcon sx={sxListItemIcon}>
                                <AccountCircleIcon sx={{color: green[500]}}/>
                            </ListItemIcon>
                            <ListItemText primary={translate("Registration", lang)}/>
                        </ListItem>
                    }

                    {
                        userInfo &&
                        <ListItem onClick={onSettingHandler}
                                  button
                        >
                            <ListItemIcon sx={sxListItemIcon}>
                                <ManageAccountsIcon/>
                            </ListItemIcon>
                            <ListItemText primary={translate("Account settings", lang)}/>
                        </ListItem>
                    }

                    {
                        userInfo &&
                        <ListItem onClick={onLogoutHandler}
                                  button
                        >
                            <ListItemIcon sx={sxListItemIcon}>
                                <ExitToAppIcon sx={{ color: red[500] }}/>
                            </ListItemIcon>
                            <ListItemText primary={translate("Logout", lang)}/>
                        </ListItem>
                    }
                </List>
            </Popover>
        </div>
    )
};