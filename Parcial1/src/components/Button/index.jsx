import React from 'react';
import Styles from './index.module.css'

const Boton = ({ children , onClickHandler }) => {
    return (
        <button onClick = {onClickHandler} className = {Styles.button}>{children}</button>
    )
}
export default Boton