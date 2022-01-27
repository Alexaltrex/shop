import React, {FC, useEffect, useState} from "react";
import style from './preview.module.scss'
import clsx from "clsx";
import './animation.css';
import {hexToRGB} from "../../../helpers/helpers";

interface IPreview {
    colors: string[]
    text?: string
}

export const Preview:FC<IPreview> = ({colors, text = 'text'}) => {
    const [color, setColor] = useState('');

    useEffect(() => {
        setColor(colors[0]);
    }, [colors]);

    return (
        <div className={style.preview}>
            <div className={style.buttons}>
                {
                    colors.map(c => (
                        <button key={c}
                                style={{background: c}}
                                className={clsx({
                                    [style.button]: true,
                                    [style.button_selected]: c === color,
                                })}
                                onClick={() => setColor(c)}
                        />


                    ))
                }
            </div>
            <div className={clsx(style.container, 'anim')}>
                <div className={clsx(style.back, style.side)} style={{background: hexToRGB(color, 0.5)}}>
                    <p>{text}</p>
                </div>
                <div className={clsx(style.left, style.side)} style={{background: hexToRGB(color, 0.5)}}>
                    <p>{text}</p>
                </div>
                <div className={clsx(style.right, style.side)} style={{background: hexToRGB(color, 0.5)}}>{text}</div>
                <div className={clsx(style.top, style.side)} style={{background: hexToRGB(color, 0.5)}}>{text}</div>
                <div className={clsx(style.bottom, style.side)} style={{background: hexToRGB(color, 0.5)}}>{text}</div>
                <div className={clsx(style.front, style.side)} style={{background: hexToRGB(color, 0.5)}}>{text}</div>
            </div>
        </div>
    )
}