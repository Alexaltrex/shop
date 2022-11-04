import React from "react";
import {Alert} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {appAC, selectInfoPopup} from "../../../store/reducers/app.reducer";
import Snackbar from "@mui/material/Snackbar";

export const InfoPopup = () => {
    const infoPopup = useSelector(selectInfoPopup);
    const dispatch = useDispatch();
    const onCloseHandler = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        dispatch(appAC.closeInfoPopup())
    };

    return (
        <Snackbar open={infoPopup.show}
                  autoHideDuration={6000}
                  anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'right'
                  }}
                  onClose={onCloseHandler}
        >
            <Alert onClose={onCloseHandler}
                   severity={infoPopup.type}
                   sx={{ width: '100%' }}>
                {infoPopup.text}
            </Alert>
        </Snackbar>
    )
}