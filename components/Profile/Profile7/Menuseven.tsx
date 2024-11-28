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
    backgroundImages: any;
}

const MenuSeven: React.FC<MenuProps> = ({ groupedSections, namecompanies, backgroundImages }) => {
    const [searchTerm, setSearchTerm] = useState<string>('');

    // Función para filtrar los elementos según el término de búsqueda
    const filterItems = (items: MenuItem[]) => {
        return items.filter((item) =>
            item.Name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.Menu_Title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.Description.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.Price.toLowerCase().includes(searchTerm.toLowerCase())
        );
    };

    return (
        <div
            className={styles.menuWrapper}
            style={{
                backgroundImage: backgroundImages || 'none',
            }}
        >
            {/* Título principal con mejoras */}


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
       

            {Object.entries(groupedSections)?.map(([sectionName, items]) => (
                <div key={sectionName} className={styles.section}>
                    <h1 className={styles.sectionTitle}>{sectionName}</h1>
                    <div className={styles.sectionItems}>
                        {filterItems(items).map((item: MenuItem) => (
                            <div
                                key={item.Item_id}
                                className={styles.menuItem}
                                style={{
                                    backgroundImage: `url(${item.Background_Image})`,
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
                                        src={`/foldercompanies/${namecompanies}/${item.Item_Image}`}
                                        alt={item.Name}
                                        width={120}
                                        height={120}
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

export default MenuSeven;
