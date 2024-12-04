import React, { useState, useMemo, useCallback } from 'react';
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
    backgroundImages: string | null;
}

const MenuSeven: React.FC<MenuProps> = ({ groupedSections, namecompanies, backgroundImages }) => {
    const [searchTerm, setSearchTerm] = useState<string>('');

    const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    }, []);

    const filteredSections = useMemo(() => {
        return Object.entries(groupedSections).map(([sectionName, items]) => {
            const filteredItems = items.filter((item) =>
                [item.Name, item.Menu_Title, item.Description, item.Price]
                    .some(field => field.toLowerCase().includes(searchTerm.toLowerCase()))
            );
            return [sectionName, filteredItems] as [string, MenuItem[]];
        });
    }, [searchTerm, groupedSections]);

    return (
        <div
            className={styles.menuContainer}
            style={{
                backgroundImage: backgroundImages || 'none',
            }}
        >
            <header className={styles.header}>
                <h1 className={styles.mainTitle}>{namecompanies}</h1>
                <input
                    type="text"
                    placeholder="Buscar en el menú..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className={styles.searchInput}
                />
            </header>

            {filteredSections.map(([sectionName, items]) => (
                <section key={sectionName} className={styles.section}>
                    <h2 className={styles.sectionTitle}>{sectionName}</h2>
                    <div className={styles.itemList}>
                        {items.map(item => (
                            <div key={item.Item_id} className={styles.itemCard}>
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
                                    <div className={styles.cardFooter}>
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

export default MenuSeven;
