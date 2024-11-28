import React, { useMemo, useState } from 'react';
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

const Menuone: React.FC<MenuProps> = ({ groupedSections, namecompanies, backgroundImages }) => {
    // Memoizing groupedSections to avoid unnecessary re-calculation
    const [searchTerm, setSearchTerm] = useState('');

    // Memoizing groupedSections to avoid unnecessary re-calculation
    const memoizedSections = useMemo(() => {
        if (!searchTerm.trim()) return Object.entries(groupedSections);

        // Filtrar por el término de búsqueda en los nombres de los ítems
        return Object.entries(groupedSections).map(([sectionName, items]) => {
            const filteredItems = items.filter((item) =>
                item.Name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.Description.toLowerCase().includes(searchTerm.toLowerCase())||
                item.Price.toLowerCase().includes(searchTerm.toLowerCase())|| 
                item.Menu_Title.toLowerCase().includes(searchTerm.toLowerCase())
            );
            return [sectionName, filteredItems] as [string, MenuItem[]];
        }).filter(([, items]) => items.length > 0); // Eliminar secciones vacías
    }, [groupedSections, searchTerm]);
    return (
        <div
            className={styles.menuWrapper}
            style={{
                backgroundImage: backgroundImages || '/images/italia.jpg',
            }}
        >
            <header className={styles.header}>
                <h1 className={styles.companyName}>{namecompanies}</h1>
                {/* Buscador */}
                <input
                    type="text"
                    className={styles.searchInput}
                    placeholder="Buscar en el menú..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
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

export default React.memo(Menuone); // Prevent unnecessary re-renders of the component
