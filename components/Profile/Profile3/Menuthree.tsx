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
    backgroundImages: string | null;
}

const Menuthree: React.FC<MenuProps> = ({ groupedSections, namecompanies, backgroundImages }) => {
    const [searchTerm, setSearchTerm] = useState<string>(''); // Estado para el término de búsqueda
    const [filteredSections, setFilteredSections] = useState(groupedSections); // Estado para secciones filtradas

    // Efecto para actualizar las secciones filtradas cada vez que cambia el término de búsqueda
    useEffect(() => {
        if (searchTerm === '') {
            setFilteredSections(groupedSections); // Si no hay búsqueda, muestra todo
        } else {
            const filtered = Object.entries(groupedSections).reduce((acc, [sectionName, items]) => {
                const filteredItems = items.filter((item) =>
                    item.Name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    item.Description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    item.Price.includes(searchTerm)||
                    item.Menu_Title.toLowerCase().includes(searchTerm.toLowerCase())
                );
                if (filteredItems.length > 0) {
                    acc[sectionName] = filteredItems;
                }
                return acc;
            }, {} as Record<string, MenuItem[]>);

            setFilteredSections(filtered); // Actualiza las secciones filtradas
        }
    }, [searchTerm, groupedSections]);

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value); // Actualiza el término de búsqueda
    };

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
                    placeholder="Buscar en el menú..."
                    value={searchTerm}
                    onChange={handleSearch}
                    className={styles.searchInput}
                />
            </header>
            {Object.entries(filteredSections)?.map(([sectionName, items]) => (
                <section key={sectionName} className={styles.section}>
                    <h2 className={styles.sectionTitle}>{sectionName}</h2>
                    <div className={styles.carousel}>
                        {items?.map((item) => (
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
                                        width={100}
                                        height={100}
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

export default Menuthree;
