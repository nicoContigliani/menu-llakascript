import React, { useMemo } from 'react';
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

const Menucero: React.FC<MenuProps> = ({ groupedSections, namecompanies, backgroundImages }) => {
    // Memoizing groupedSections to avoid unnecessary re-calculation
    const memoizedSections = useMemo(() => {
        return Object.entries(groupedSections);
    }, [groupedSections]);

    return (
        <div
            className={styles.menuWrapper}
            style={{
                backgroundImage: backgroundImages || '/images/italia.jpg',
            }}
        >
            <header className={styles.header}>
                <h1>{namecompanies}</h1>
            </header>
            {memoizedSections.map(([sectionName, items]) => (
                <div key={sectionName} className={styles.section}>
                    <h1 className={styles.sectionTitle}>{sectionName}</h1>
                    <div className={styles.sectionItems}>
                        {items.map((item: MenuItem) => (
                            <div
                                key={item.Item_id}
                                className={styles.menuItem}
                                style={{
                                    backgroundImage: backgroundImages || '/foldercompanies/LlakaScript/background-food.jpg',
                                }}
                            >
                                <div className={styles.overlay}></div>
                                <div className={styles.itemInfo}>
                                    <h2>{item.Name}</h2>
                                    <p>{item.Description}</p>
                                    <span className={styles.price}>{`$${item.Price}`}</span>
                                </div>
                                <div className={styles.itemImage}>
                                    <Image
                                        src={`/foldercompanies/${namecompanies}/${item.Item_Image}` || '/foldercompanies/LlakaScript/background-food.jpg'}
                                        alt={item.Name}
                                        width={100}
                                        height={100}
                                        priority // Prioritize loading images that are above the fold
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default React.memo(Menucero); // Prevent unnecessary re-renders of the component
