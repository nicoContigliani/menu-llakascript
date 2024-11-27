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
    backgroundImages: string | null;
}

const Menufourd: React.FC<MenuProps> = ({ groupedSections, namecompanies, backgroundImages }) => {
    const [searchTerm, setSearchTerm] = useState('');

    // Filtrar los elementos de menú en base al término de búsqueda
    const filteredSections = Object.entries(groupedSections).map(([sectionName, items]) => {
        // Filtramos los items por nombre
        const filteredItems = items.filter((item) =>
            item.Name.toLowerCase().includes(searchTerm.toLowerCase())||
            item.Description.toLowerCase().includes(searchTerm.toLowerCase())||
            item.Menu_Title.toLowerCase().includes(searchTerm.toLowerCase())||
            item.Price.toLowerCase().includes(searchTerm.toLowerCase())    
        );
        return [sectionName, filteredItems] as [string, MenuItem[]];
    });

    return (
        <div
            className={styles.menuContainer}
            style={{
                backgroundImage: backgroundImages || 'none',
            }}
        >
            <header className={styles.header}>
                <h1>{namecompanies}</h1>
                {/* Campo de búsqueda */}
                <input
                    type="text"
                    placeholder="Buscar artículo..."
                    className={styles.searchInput}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </header>
            
            {filteredSections.map(([sectionName, items]) => (
                <section key={sectionName} className={styles.section}>
                    <h2 className={styles.sectionTitle}>{sectionName}</h2>
                    <div className={styles.grid}>
                        {items.length > 0 ? (
                            items.map((item) => (
                                <div
                                    key={item.Item_id}
                                    className={styles.card}
                                    style={{
                                        borderColor: item.Primary_Color,
                                        background: `linear-gradient(145deg, ${item.Primary_Color}, ${item.Secondary_color})`,
                                    }}
                                >
                                    <div className={styles.cardImage}>
                                        <Image
                                            src={`/foldercompanies/${namecompanies}/${item.Item_Image}`}
                                            alt={item.Name}
                                            width={200}
                                            height={200}
                                            priority
                                        />
                                    </div>
                                    <div className={styles.cardContent}>
                                        <h3 className={styles.cardTitle}>{item.Name}</h3>
                                        <p className={styles.cardDescription}>{item.Description}</p>
                                        <span className={styles.cardPrice}>{`$${item.Price}`}</span>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p>No se encontraron artículos</p>
                        )}
                    </div>
                </section>
            ))}
        </div>
    );
};

export default Menufourd;
