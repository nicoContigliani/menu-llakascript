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

const MenuNine: React.FC<MenuProps> = ({ groupedSections, namecompanies, backgroundImages }) => {
    const [searchTerm, setSearchTerm] = useState<string>('');

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    // Función para filtrar los elementos del menú
    const filteredItems = (items: MenuItem[]) => {
        return items.filter(item => 
            item.Name.toLowerCase().includes(searchTerm.toLowerCase())||
            item.Menu_Title.toLowerCase().includes(searchTerm.toLowerCase())||
            item.Description.toLowerCase().includes(searchTerm.toLowerCase())||
            item.Price.toLowerCase().includes(searchTerm.toLowerCase())
        );
    };

    return (
        <div
            className={styles.menuContainer}
            style={{
                backgroundImage: backgroundImages || 'none',
            }}
        >
            <header className={styles.header}>
                <h1 className={styles.mainTitle}>{namecompanies}</h1>
                {/* Campo de búsqueda */}
                <input
                    type="text"
                    placeholder="Buscar..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className={styles.searchInput}
                />
            </header>
            <div className={styles.menuWrapper}>
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
                ))}
            </div>
        </div>
    );
};

export default MenuNine;
