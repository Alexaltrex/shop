import clsx from "clsx";
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import {hexToRGB} from "../../../../helpers/helpers";
import React from "react";
import style from './logo.module.scss';
import '../../../common/Preview/animation.css'

export const Logo = () => {
    const color = '#000080';
    const text = 'SHOP';
    return (
        <div className={style.logo}>
            <div className={clsx(style.container, 'anim')}>
                <div className={clsx(style.back, style.side)} style={{background: hexToRGB(color, 0.5)}}>
                    <p>{text}</p>
                </div>
                <div className={clsx(style.left, style.side)} style={{background: hexToRGB(color, 0.5)}}>
                    <ShoppingBagIcon/>
                </div>
                <div className={clsx(style.right, style.side)} style={{background: hexToRGB(color, 0.5)}}>
                    <ShoppingBagIcon/>
                </div>
                <div className={clsx(style.top, style.side)} style={{background: hexToRGB(color, 0.5)}}/>


                <div className={clsx(style.bottom, style.side)} style={{background: hexToRGB(color, 0.5)}}/>

                <div className={clsx(style.front, style.side)} style={{background: hexToRGB(color, 0.5)}}>
                    {text}
                </div>
            </div>
        </div>
    )
}