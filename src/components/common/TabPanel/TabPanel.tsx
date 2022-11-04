import React, {FC} from "react";

interface ITabPanel {
    children?: React.ReactNode
    index: number
    currentIndex: number
    className?: string
}

export const TabPanel: FC<ITabPanel> = ({
                                            index,
                                            currentIndex,
                                            children,
                                            className
}) => {
    return (
        <div
            role="tabpanel"
            hidden={currentIndex !== index}
            style={{paddingTop: '0px'}}
            className={className}
        >
            {
                currentIndex === index && children
            }
        </div>
    )
};