import React, { useEffect, useState } from 'react';
import styles from './index.module.css';
import Boton from '../../components/Button';
import Tarjeta from '../../components/Tarjeta';
import Modal from '../../components/Modal';
import SearchBar from '../../components/Search';
import FilterByType from '../../components/Filter';
import { getDishes, deleteDish, postDish } from '../../api/apiServices';
import { Link } from 'react-router-dom';

const Home = () => {
  const [dishes, setDishes] = useState([]);
  const [filteredDishes, setFilteredDishes] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [newDish, setNewDish] = useState({
    name: '',
    description: '',
    type: '',
    preparation: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewDish((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSaveDish = async () => {
    await postDish(newDish);
    setIsModalOpen(false);
    const updatedDishes = await getDishes();
    setDishes(updatedDishes);
    setFilteredDishes(updatedDishes);
  };

  const handleDeleteDish = async (id) => {
    await deleteDish(id);
    const updatedDishes = await getDishes();
    setDishes(updatedDishes);
    setFilteredDishes(updatedDishes);
  };

  const openModal = () => {
    setNewDish({ name: '', description: '', type: '', preparation: '' });
    setIsModalOpen(true);
  };

  const handleSearchChange = (term) => {
    setSearchTerm(term);
    filterDishes(term, selectedType);
  };

  const handleTypeChange = (type) => {
    setSelectedType(type);
    filterDishes(searchTerm, type);
  };

  const filterDishes = (searchTerm, type) => {
    let filtered = dishes;

    if (searchTerm) {
      filtered = filtered.filter((dish) =>
        dish.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (type) {
      filtered = filtered.filter((dish) => dish.type === type);
    }

    setFilteredDishes(filtered);
  };

  useEffect(() => {
    const getDishesPayload = async () => {
      const newDishes = await getDishes();
      setDishes(newDishes);
      setFilteredDishes(newDishes);
    };
    getDishesPayload();
  }, []);

  const dishTypes = [...new Set(dishes.map((dish) => dish.type))];

  return (
    <>
      <div>
        <h1>Recetas</h1>
      </div>

      <div className={styles.contenedorHeader}>
        <FilterByType types={dishTypes} selectedType={selectedType} onTypeChange={handleTypeChange} />
        <Boton onClickHandler={openModal}>Agregar una receta</Boton>
      </div>

      <div className={styles.contenedorSearch}>
        <SearchBar searchTerm={searchTerm} onSearchChange={handleSearchChange} />
      </div>

      <div className={styles.contenedorTarjetas}>
        {filteredDishes.map((d) => (
          <Tarjeta key={d.id}>
            <div className={styles.contenedorTitulo}>{d.name}</div>

            <div className={styles.contenedorBoton}>
              <Boton onClickHandler={() => { }}>
                <Link to={`/dishes/${d.id}`}>Detalles</Link>
              </Boton>
            </div>

            <div className={styles.contenedorBoton}>
              <Boton onClickHandler={() => handleDeleteDish(d.id)}>Borrar</Boton>
            </div>
          </Tarjeta>
        ))}
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h2>Agregar nueva receta</h2>
        <input
          type="text"
          name="name"
          placeholder="Nombre"
          className={styles.modalInput}
          value={newDish.name}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="description"
          placeholder="Descripción"
          className={styles.modalInput}
          value={newDish.description}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="type"
          placeholder="Tipo"
          className={styles.modalInput}
          value={newDish.type}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="preparation"
          placeholder="Preparación"
          className={styles.modalInput}
          value={newDish.preparation}
          onChange={handleInputChange}
        />
        <Boton onClickHandler={handleSaveDish}>Guardar</Boton>
      </Modal>
    </>
  );
};

export default Home;