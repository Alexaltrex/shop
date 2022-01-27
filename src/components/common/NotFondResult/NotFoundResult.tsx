import DoNotDisturbAltIcon from '@mui/icons-material/DoNotDisturbAlt';
import React from "react";
import style from './notFoundResult.module.scss';

export const NotFoundResult = () => {
    return (
        <div className={style.notFoundResult}>
            <DoNotDisturbAltIcon sx={{
                fontSize: 80,
                color: 'lightgray',
            }}/>
            <p>Nothing found for the selected query parameters</p>
        </div>
    )
}