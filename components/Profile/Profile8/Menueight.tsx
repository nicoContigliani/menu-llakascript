import React, { useState, useEffect, useMemo } from 'react';
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
    backgroundImages: any;
}

const MenuEight: React.FC<MenuProps> = ({ groupedSections, namecompanies, backgroundImages }) => {
    const [searchTerm, setSearchTerm] = useState<string>(''); // State for search query

    // Debounced search term to optimize performance
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState<string>(searchTerm);

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearchTerm(searchTerm);
        }, 300); // 300ms debounce delay

        return () => clearTimeout(timer); // Cleanup on effect re-run
    }, [searchTerm]);

    // Memoized filtering function
    const filteredItems = useMemo(() => {
        const allItems = Object.values(groupedSections).flat();
        return allItems.filter(item =>
            item.Name.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
            item.Description.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
        );
    }, [debouncedSearchTerm, groupedSections]);

    return (
        <div
            className={styles.menuContainer}
            style={{
                backgroundImage: backgroundImages || 'none',
                backgroundSize: 'cover', // Correcta propiedad en camelCase
                backgroundPosition: 'center', // Correcta propiedad en camelCase
                backgroundAttachment: 'fixed', // Correcta propiedad en camelCase
            }}
        >
            <header className={styles.header}>
                <h1 className={styles.mainTitle}>{namecompanies}</h1>

                {/* Add search input */}
                <input
                    type="text"
                    placeholder="Search items..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className={styles.searchInput}
                />
            </header>

            <div className={styles.menuWrapper}>
                {Object.entries(groupedSections)?.map(([sectionName, items]) => {
                    const filteredSectionItems = filteredItems.filter(item => item.Section === sectionName);

                    return filteredSectionItems.length > 0 ? (
                        <div key={sectionName} className={styles.section}>
                            <h1 className={styles.sectionTitle}>{sectionName}</h1>
                            <div className={styles.sectionItems}>
                                {filteredSectionItems.map((item) => (
                                    <div key={item.Item_id} className={styles.menuItem}>
                                        <div className={styles.itemImage}>
                                            <Image
                                                src={`/foldercompanies/${namecompanies}/${item.Item_Image}`}
                                                alt={item.Name}
                                                width={80}
                                                height={80}
                                            />
                                        </div>
                                        <div className={styles.itemInfo}>
                                            <h2>{item.Name}</h2>
                                            <p>{item.Description}</p>
                                            <span className={styles.price}>{`$${item.Price}`}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : null;
                })}
            </div>
        </div>
    );
};

export default MenuEight;
