import React from 'react';
import Styles from './module.css'


const boton = ({ children , onClickHandler }) => {
    return (
        <button onClick = {onClickHandler} className = {Styles.button}>{children}</button>
    )
}
export default boton