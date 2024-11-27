import React, { useState, useEffect } from 'react';
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
    const [filteredItems, setFilteredItems] = useState<MenuItem[]>([]); // State for filtered items

    // Function to filter items based on search term
    const filterItems = (term: string) => {
        const allItems = Object.values(groupedSections).flat(); // Get all menu items
        return allItems.filter(item =>
            item.Name.toLowerCase().includes(term.toLowerCase()) ||
            item.Description.toLowerCase().includes(term.toLowerCase())
        );
    };

    // Effect to filter items whenever the search term changes
    useEffect(() => {
        setFilteredItems(filterItems(searchTerm));
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
