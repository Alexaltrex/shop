import {Button} from "@mui/material";
import React, {FC} from "react";
import ClearIcon from '@mui/icons-material/Clear';

interface IResetButton {
    onResetHandler: () => void
}

export const ResetButton: FC<IResetButton> = ({onResetHandler}) => {
    return (
        <div>
            <Button size="small"
                    sx={{color: '#FFF'}}
                    startIcon={<ClearIcon />}
                    onClick={onResetHandler}>
                Reset
            </Button>
        </div>
    )
}