import { useState, useEffect } from 'react';
import { getDish } from '../../api/apiServices'
import Styles from './module.css'
import boton from '../../components/Button'
import tarjeta from '../../components/Tarjeta';
import { Link, useParams } from 'react-router-dom';

const details = () => {
    const { id } = useParams();
    const [dishes, setDishes] = useState([])

    useEffect(() => {
        const getDishesPayload = async () => {
            const newDishes = await getDish(id)
            setDishes(newDishes)
        }
        getDishesPayload()
    }, []);

    return (
        <div>
            <div className={Styles.contenedortarjetas}>
                <tarjeta>
                    <div className={Styles.contenedorTitulo}>{dishes.name}</div>
                    <div>
                        <p>{dishes.description}</p>
                        <p>Tipo: {dishes.type}</p>
                        <p>Preparacion: {dishes.preparation}</p>
                    </div>
                </tarjeta>
            </div>
            <boton onClickHandler={() => { }}> <Link to={`/`}>Atras</Link> </boton>
        </div>
    )
}

export default details