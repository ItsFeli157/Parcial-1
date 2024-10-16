import styles from './module.css'

const modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <button className={styles.modalCloseButton} onClick={onClose}> &times; </button>
        {children}
      </div>
    </div>
  );
};

export default modal;