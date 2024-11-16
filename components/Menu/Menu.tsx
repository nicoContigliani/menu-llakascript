import React from 'react';
import { MenuProfile } from '../../types/menu';
import styles from './menu.module.css';

interface MenuProps {
  config: MenuProfile;
}

const Menu: React.FC<MenuProps> = ({ config }) => {
  return (
    <div className={styles.menu} style={{ backgroundImage: `url(${config.theme.backgroundImage})` }}>
      <h1 className={styles.title} style={{ color: config.theme.primaryColor }}>
        {config.title}
      </h1>
      {config.sections.map((section) => (
        <div key={section.title} className={styles.section}>
          <h2 className={styles.sectionTitle} style={{ color: config.theme.secondaryColor }}>
            {section.title}
          </h2>
          <div className={styles.items}>
            {section?.items?.map((item) => (
              <div key={item.id} className={styles.item}>
                {item.imageUrl && (
                  <img src={item.imageUrl} alt={item.name} className={styles.itemImage} />
                )}
                <div className={styles.itemDetails}>
                  <h3>{item.name}</h3>
                  <p>{item.description}</p>
                  <strong>{item.price} USD</strong>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Menu;
