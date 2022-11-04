import DoNotDisturbAltIcon from '@mui/icons-material/DoNotDisturbAlt';
import React, {FC} from "react";
import style from './notFoundResult.module.scss';

export interface INotFoundResult {
    text: string
}

export const NotFoundResult: FC<INotFoundResult> = ({text}) => {
    return (
        <div className={style.notFoundResult}>
            <DoNotDisturbAltIcon sx={{
                fontSize: 80,
                color: 'lightgray',
            }}/>
            <p>{text}</p>
        </div>
    )
}