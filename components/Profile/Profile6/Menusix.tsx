import React, { useState } from 'react';
import Image from 'next/image';
import styles from './MenuNew.module.css';

interface MenuItem {
    Menu_Title: string;
    Profile_Type: string;
    Primary_Color: string;
    Secondary_color: string;
    Background_Image: string;
    Item_Image: string;
    Section: string;
    Item_id: number;
    Name: string;
    Description: string;
    Price: string;
}

interface MenuProps {
    namecompanies: string;
    groupedSections: Record<string, MenuItem[]>;
    menuData: any;
    backgroundImages: string | null;
}

const MenuSix: React.FC<MenuProps> = ({ groupedSections, namecompanies, backgroundImages }) => {
    const [hoveredItem, setHoveredItem] = useState<number | null>(null);

    return (
        <div
            className={styles.menuContainer}
            style={{
                backgroundImage: backgroundImages || 'none',
            }}
        >
            <header className={styles.header}>
                <h1 className={styles.mainTitle}>{namecompanies}</h1>
            </header>

            {Object.entries(groupedSections).map(([sectionName, items]) => (
                <section key={sectionName} className={styles.section}>
                    <h2 className={styles.sectionTitle}>{sectionName}</h2>
                    <div className={styles.itemList}>
                        {items.map((item) => (
                            <div
                                key={item.Item_id}
                                className={`${styles.itemCard} ${hoveredItem === item.Item_id ? styles.cardHovered : ''}`}
                                style={{
                                    backgroundColor: item.Primary_Color,
                                    borderColor: item.Secondary_color,
                                }}
                                onMouseEnter={() => setHoveredItem(item.Item_id)}
                                onMouseLeave={() => setHoveredItem(null)}
                            >
                                <div className={styles.cardImageWrapper}>
                                    <Image
                                        src={`/foldercompanies/${namecompanies}/${item.Item_Image}`}
                                        alt={item.Name}
                                        width={500}
                                        height={500}
                                        priority
                                    />
                                </div>
                                <div className={styles.cardContent}>
                                    <h3 className={styles.cardTitle}>{item.Name}</h3>
                                    <p className={styles.cardDescription}>{item.Description}</p>
                                    <span className={styles.cardPrice}>{`$${item.Price}`}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            ))}
        </div>
    );
};

export default MenuSix;
