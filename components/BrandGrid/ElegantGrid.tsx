import React from 'react';
import styles from './ElegantGrid.module.css';

interface GridItem {
  id: number;
  imageUrl: string;
  title: string;
}

interface ElegantGridProps {
  items: GridItem[];
}

const ElegantGrid: React.FC<ElegantGridProps> = ({ items }) => {
  return (
    <div className={styles.gridContainer}>
      {items?.map((item) => (
        <div key={item.id} className={styles.gridItem}>
          <div className={styles.imageContainer}>
            <img src={item?.imageUrl} alt={item.title} className={styles.image} />
          </div>
          <h3 className={styles.title}>{item?.title}</h3>
        </div>
      ))}
    </div>
  );
};

export default ElegantGrid;