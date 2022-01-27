import React, {FC} from "react";

interface ITabPanel {
    children?: React.ReactNode
    index: number
    currentIndex: number
}

export const TabPanel: FC<ITabPanel> = ({index, currentIndex, children}) => {
    return (
        <div
            role="tabpanel"
            hidden={currentIndex !== index}
            style={{paddingTop: '0px'}}
            //id={`simple-tabpanel-${index}`}
            //aria-labelledby={`simple-tab-${index}`}
        >
            {
                currentIndex === index && children
            }
        </div>
    )
};