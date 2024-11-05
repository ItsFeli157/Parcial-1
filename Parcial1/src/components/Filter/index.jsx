import React from 'react';
import styles from './index.module.css';

const FilterByType = ({ types, selectedType, onTypeChange }) => {
  return (
    <div className={styles.filterContainer}>
      <select
        value={selectedType}
        onChange={(e) => onTypeChange(e.target.value)}
        className={styles.filterSelect}>
        <option value="">Tipos</option>
        {types.map((type, index) => (
          <option key={index} value={type}>
            {type}
          </option>
        ))}
      </select>
    </div>
  );
};
export default FilterByType;