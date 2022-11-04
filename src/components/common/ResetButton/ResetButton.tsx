import {Button} from "@mui/material";
import React, {FC} from "react";
import ClearIcon from '@mui/icons-material/Clear';
import {useSelector} from "react-redux";
import {selectLang} from "../../../store/reducers/app.reducer";
import {translate} from "../../../types/lang";

interface IResetButton {
    onResetHandler: () => void
}

export const ResetButton: FC<IResetButton> = ({onResetHandler}) => {
    const lang = useSelector(selectLang);
    return (
        <div>
            <Button size="small"
                    sx={{
                        color: '#ffe1e4',
                        transition: "0.3s",
                        '&:hover': {
                            color: 'lightcoral',
                        }
                    }}
                    startIcon={<ClearIcon />}
                    onClick={onResetHandler}>
                {translate("Reset", lang)}
            </Button>
        </div>
    )
}