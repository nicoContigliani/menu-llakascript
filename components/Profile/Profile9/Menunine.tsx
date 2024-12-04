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

const MenuNine: React.FC<MenuProps> = ({ groupedSections, namecompanies, backgroundImages }) => {
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState<string>('');

    // Debounced search term to optimize performance
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearchTerm(searchTerm);
        }, 300); // 300ms debounce delay

        return () => clearTimeout(timer); // Cleanup on effect re-run
    }, [searchTerm]);

    // Memoize the filtered items to avoid unnecessary recalculations
    const filteredItems = useMemo(() => {
        const allItems = Object.values(groupedSections).flat();
        return allItems.filter(item => 
            item.Name.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
            item.Menu_Title.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
            item.Description.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
            item.Price.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
        );
    }, [debouncedSearchTerm, groupedSections]);

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

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
                {/* Search input */}
                <input
                    type="text"
                    placeholder="Buscar..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className={styles.searchInput}
                />
            </header>
            <div className={styles.menuWrapper}>
                {Object.entries(groupedSections).map(([sectionName, items]) => {
                    const filteredSectionItems = filteredItems.filter(item => item.Section === sectionName);

                    return filteredSectionItems.length > 0 ? (
                        <div key={sectionName} className={styles.section}>
                            <h1 className={styles.sectionTitle}>{sectionName}</h1>
                            <div className={styles.sectionItems}>
                                {filteredSectionItems.map((item: MenuItem) => (
                                    <div
                                        key={item.Item_id}
                                        className={styles.menuItem}
                                        style={{
                                            backgroundColor: item.Primary_Color || '#0078D7',
                                        }}
                                    >
                                        <div className={styles.itemImage}>
                                            <Image
                                                src={`/foldercompanies/${namecompanies}/${item.Item_Image}`}
                                                alt={item.Name}
                                                width={50}
                                                height={50}
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

export default MenuNine;
