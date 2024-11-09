import React from 'react';
import styles from './ModalComponent.module.css';

const ModalComponent = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.container} onClick={(e) => e.stopPropagation()}>
        {/* Botón de cierre en la esquina superior derecha */}
        <div className={styles.closeButton} onClick={onClose}>
          &times; cerrar
        </div>
        
        <div className={styles.textContainer}>
          <h1 className={styles.title}>Título Principal</h1>
          <h2 className={styles.titleApp}>Título de la App</h2>
        </div>
        
        <div className={styles.image}>
          <img src="/path/to/image.jpg" alt="Imagen" className={styles.img} />
        </div>
        
        <button className={styles.actionButton} onClick={onClose}>
          Cerrar
        </button>
      </div>
    </div>
  );
};

export default ModalComponent;
