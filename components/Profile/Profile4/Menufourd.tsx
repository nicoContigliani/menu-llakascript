import React from 'react';
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

const Menufourd: React.FC<MenuProps> = ({ groupedSections, namecompanies, backgroundImages }) => {
    return (
        <div
            className={styles.menuContainer}
            style={{
                backgroundImage: backgroundImages || 'none',
            }}
        >
            <header className={styles.header}>
                <h1>{namecompanies}</h1>
            </header>
            {Object.entries(groupedSections)?.map(([sectionName, items]) => (
                <section key={sectionName} className={styles.section}>
                    <h2 className={styles.sectionTitle}>{sectionName}</h2>
                    <div className={styles.grid}>
                        {items?.map((item) => (
                            <div
                                key={item.Item_id}
                                className={styles.card}
                                style={{
                                    borderColor: item.Primary_Color,
                                    background: `linear-gradient(145deg, ${item.Primary_Color}, ${item.Secondary_color})`,
                                }}
                            >
                                <div className={styles.cardImage}>
                                    <Image
                                        src={`/foldercompanies/${namecompanies}/${item.Item_Image}`}
                                        alt={item.Name}
                                        width={200}
                                        height={200}
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

export default Menufourd;
