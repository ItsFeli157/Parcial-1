import { useState, useEffect } from 'react';
import { getDish } from '../../api/apiServices'
import Styles from './index.module.css'
import Boton from '../../components/Button'
import Tarjeta from '../../components/Tarjeta';
import { Link, useParams } from 'react-router-dom';

const Details = () => {
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
            <div className={Styles.contenedorTarjetas}>

                <Tarjeta>
                    <div className={Styles.contenedorTitulo}>{dishes.name}</div>
                    <div>
                        <p>{dishes.description}</p>
                        <p>Tipo: {dishes.type}</p>
                        <p>Preparacion: {dishes.preparation}</p>
                    </div>
                </Tarjeta>
            </div>
            <Boton onClickHandler={() => { }}>
                <Link to={`/`}>Volver al inicio</Link>
            </Boton>
        </div>
    )
}

export default Details