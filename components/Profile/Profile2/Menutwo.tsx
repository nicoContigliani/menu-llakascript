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

const Menutwo: React.FC<MenuProps> = ({ groupedSections, namecompanies, backgroundImages }) => {
    // Memoizing the groupedSections to avoid unnecessary recalculation
    const memoizedSections = useMemo(() => {
        return Object.entries(groupedSections);
    }, [groupedSections]);

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
            {memoizedSections.map(([sectionName, items]) => (
                <section key={sectionName} className={styles.section}>
                    <h2 className={styles.sectionTitle}>{sectionName}</h2>
                    <div className={styles.itemGrid}>
                        {items.map((item) => (
                            <div
                                key={item.Item_id}
                                className={styles.card}
                                style={{ borderColor: item.Primary_Color }}
                            >
                                <div
                                    className={styles.cardBackground}
                                    style={{
                                        backgroundImage: `url(${item.Background_Image})`,
                                    }}
                                ></div>
                                <div className={styles.cardContent}>
                                    <div className={styles.cardImage}>
                                        <Image
                                            src={`/foldercompanies/${namecompanies}/${item.Item_Image}`}
                                            alt={item.Name}
                                            width={100}
                                            height={100}
                                            priority // Prioritize images that are visible above the fold
                                        />
                                    </div>
                                    <div className={styles.cardDetails}>
                                        <h3 className={styles.cardTitle}>{item.Name}</h3>
                                        <p className={styles.cardDescription}>{item.Description}</p>
                                        <span className={styles.cardPrice}>{`$${item.Price}`}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            ))}
        </div>
    );
};

export default React.memo(Menutwo); // Prevent unnecessary re-renders of the component
