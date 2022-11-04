import React, {FC} from "react";
import style from './preview.module.scss'
import clsx from "clsx";
import './animation.css';
import {hexToRGB} from "../../../helpers/helpers";

interface IPreview {
    colors: string[]
    text?: string
    selectedColor: string
    onSelectHandler: (color: string) => void
    isButtons?: boolean
}

export const Preview: FC<IPreview> = ({
                                          colors,
                                          text = 'text',
                                          selectedColor,
                                          onSelectHandler,
                                          isButtons = true
                                      }) => {

    return (
        <div className={style.preview}>
            {
                isButtons &&
                <div className={style.buttons}>
                    {
                        colors.map(c => (
                            <button key={c}
                                    style={{background: c}}
                                    className={clsx({
                                        [style.button]: true,
                                        [style.button_selected]: c === selectedColor,
                                    })}
                                    onClick={() => onSelectHandler(c)}
                            />


                        ))
                    }
                </div>
            }
            <div className={clsx(style.container, 'anim')}>
                <div className={clsx(style.back, style.side)} style={{background: hexToRGB(selectedColor, 0.5)}}>
                    <p>{text}</p>
                </div>
                <div className={clsx(style.left, style.side)} style={{background: hexToRGB(selectedColor, 0.5)}}>
                    <p>{text}</p>
                </div>
                <div className={clsx(style.right, style.side)}
                     style={{background: hexToRGB(selectedColor, 0.5)}}>{text}</div>
                <div className={clsx(style.top, style.side)}
                     style={{background: hexToRGB(selectedColor, 0.5)}}>{text}</div>
                <div className={clsx(style.bottom, style.side)}
                     style={{background: hexToRGB(selectedColor, 0.5)}}>{text}</div>
                <div className={clsx(style.front, style.side)}
                     style={{background: hexToRGB(selectedColor, 0.5)}}>{text}</div>
            </div>
        </div>
    )
}