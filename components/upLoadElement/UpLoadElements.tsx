import React from 'react';
import styles from './ElegantGrid.module.css';



const UpLoadElements = (props) => {
  return (
    <div className={styles.gridContainer}>
      {props?.children && props?.children}
    </div>
  );
};

export default UpLoadElements;