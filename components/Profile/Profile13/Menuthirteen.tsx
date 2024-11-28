import React, { useState, useMemo } from 'react';
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
    backgroundImages?: string;
}

const Menuthirteen: React.FC<MenuProps> = ({ groupedSections, namecompanies, backgroundImages }) => {
    const [searchTerm, setSearchTerm] = useState<string>('');

    // Debounce to optimize search handling
    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const filteredItems = useMemo(() => {
        const searchLower = searchTerm.toLowerCase();
        return (items: MenuItem[]) => {
            return items.filter(item =>
                item.Name.toLowerCase().includes(searchLower) ||
                item.Menu_Title.toLowerCase().includes(searchLower) ||
                item.Description.toLowerCase().includes(searchLower) ||
                item.Price.toLowerCase().includes(searchLower)
            );
        };
    }, [searchTerm]);

    return (
        <div
            className={styles.menuContainer}
            style={{
                backgroundImage: backgroundImages || 'none',
            }}
        >
            <div className={styles.menuWrapper}>
            <header className={styles.header}>
                <h1 className={styles.mainTitle}>{namecompanies}</h1>
                <input
                    type="text"
                    placeholder="Buscar..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className={styles.searchInput}
                />
            </header>
                {Object.entries(groupedSections)?.map(([sectionName, items]) => (
                    <div key={sectionName} className={styles.section}>
                        <h1 className={styles.sectionTitle}>{sectionName}</h1>
                        <div className={styles.sectionItems}>
                            {filteredItems(items)?.map((item: MenuItem) => (
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
                                            width={120}
                                            height={120}
                                            loading="lazy" // Lazy load images for better performance
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
                ))}
            </div>
        </div>
    );
};

export default Menuthirteen;