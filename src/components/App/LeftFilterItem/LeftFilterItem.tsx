import {FC, ReactElement, SyntheticEvent, useState} from "react";
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Typography from "@mui/material/Typography";
import style from './leftFilterItem.module.scss';

interface ILeftFilterItem {
    title: string
    content: ReactElement
}

export const LeftFilterItem: FC<ILeftFilterItem> = ({title, content}) => {
    const [expanded, setExpanded] = useState(true);

    const handleChange =
        (panel: string) => (event: SyntheticEvent, isExpanded: boolean) => {
            setExpanded(isExpanded);
        };

    return (
        <Accordion
            expanded={expanded}
            onChange={handleChange(title)}
            className={style.leftFilterItem}
        >
            <AccordionSummary
                expandIcon={<ExpandMoreIcon/>}
                aria-controls="panel1bh-content"
                id="panel1bh-header"
                sx={{padding: '0 10px'}}
            >
                <Typography sx={{ color: "lime"}}>
                    {title}
                </Typography>
            </AccordionSummary>
            <AccordionDetails sx={{padding: '0 10px'}}>
                {content}
            </AccordionDetails>
        </Accordion>
    )
};