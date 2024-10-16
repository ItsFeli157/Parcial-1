import React from 'react';
import Styles from './module.css'

const tarjeta = ({ children }) => {
    return (
        <div className = {Styles.tarjeta}> {children} </div>
    )
}
export default tarjeta