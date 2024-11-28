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
    groupedSections: Record<string, MenuItem[]>; // Ensuring correct typing for groupedSections
    menuData: any;
    backgroundImages: string | null;
}

const MenuSix: React.FC<MenuProps> = ({ groupedSections, namecompanies, backgroundImages }) => {
    const [hoveredItem, setHoveredItem] = useState<number | null>(null);
    const [searchTerm, setSearchTerm] = useState<string>('');

    // Memoize the search handler to prevent unnecessary re-creations on every render
    const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    }, []);

    // Memoize filteredSections to avoid recalculating on every render
    const filteredSections = useMemo(() => {
        return Object.entries(groupedSections).map(([sectionName, items]) => {
            const filteredItems = items.filter((item) =>
                item.Name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.Menu_Title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.Description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.Price.toLowerCase().includes(searchTerm.toLowerCase())
            );
            return [sectionName, filteredItems] as [string, MenuItem[]];
        });
    }, [searchTerm, groupedSections]); // Recompute when searchTerm or groupedSections change

    return (
        <div
            className={styles.menuContainer}
            style={{
                backgroundImage: backgroundImages || 'none',
            }}
        >
            <header className={styles.header}>
                <h1 className={styles.mainTitle}>{namecompanies}</h1>
                {/* Search input with optimized handler */}
                <input
                    type="text"
                    placeholder="Search items..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className={styles.searchInput}
                />
            </header>

            {filteredSections.map(([sectionName, items]) => (
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
