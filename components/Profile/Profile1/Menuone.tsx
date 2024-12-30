import React, { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import styles from './MenuNew.module.css';
import ElegantCarouselPromotions from '../../ElegantCarouselPromotions/ElegantCarouselPromotions';

interface MenuItem {
    Menu_Title?: string;
    Profile_Type?: string;
    Primary_Color?: string;
    Secondary_color?: string;
    Background_Image?: string;
    Item_Image?: string;
    Section?: string;
    Item_id?: number;
    Name?: string;
    Description?: string;
    Price?: string;
    hojas?: { Hoja1?: any[] };
    status_Companies?: true;
    visits?: 0;
    licence?: any[];
    infoVisits?: any[];
    loyaltyProgram?: any[];
    delivery?: any[];
    trafficStats?: any[];
    marketingCampaigns?: any[];
    giftCards?: any[];
    badcustomer?: any[];
    godcustomer?: any[];
    raiting?: number;
    latitude?: string;
    longitudestring;
    createAt?: string;
    updateAt?: string;
}

interface MenuProps {
    namecompanies: string;
    groupedSections: Record<string, MenuItem[]>;
    menuData: any;
    backgroundImages: string | null;
    groupedSectionsPromotions: Record<string, MenuItem[]>;
}

const Menuone: React.FC<MenuProps> = ({ groupedSections, namecompanies, backgroundImages, groupedSectionsPromotions }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [menuTime, setMenuTime] = useState(0); // Tiempo total en el menú
    const [sectionTimes, setSectionTimes] = useState<Record<string, number>>({}); // Tiempo en cada sección
    const [currentSection, setCurrentSection] = useState<string | null>(null);
    const [startTime, setStartTime] = useState<number | null>(null);
    const [carouselTime, setCarouselTime] = useState<number>(0); // Tiempo en el carrusel
    const [carouselStartTime, setCarouselStartTime] = useState<number | null>(null); // Inicio del carrusel

    // Manejar el tiempo total en el menú (actualización dinámica)
    useEffect(() => {
        const start = Date.now();

        const intervalId = setInterval(() => {
            const elapsed = (Date.now() - start) / 1000; // Calcular el tiempo en segundos
            setMenuTime(elapsed); // Actualizar el tiempo en el estado
        }, 1000); // Actualizar cada segundo

        return () => clearInterval(intervalId); // Limpiar el intervalo al desmontar
    }, []);

    // Función para manejar la entrada a una sección
    const handleSectionEnter = (sectionName: string) => {
        const now = Date.now();
        if (currentSection && startTime) {
            const duration = (now - startTime) / 1000; // Convertir a segundos
            setSectionTimes((prev) => ({
                ...prev,
                [currentSection]: (prev[currentSection] || 0) + duration,
            }));
        }
        setCurrentSection(sectionName);
        setStartTime(now);
    };

    // Función para manejar la salida del menú o de una sección
    const handleSectionLeave = () => {
        const now = Date.now();
        if (currentSection && startTime) {
            const duration = (now - startTime) / 1000; // Convertir a segundos
            setSectionTimes((prev) => ({
                ...prev,
                [currentSection]: (prev[currentSection] || 0) + duration,
            }));
        }
        setCurrentSection(null);
        setStartTime(null);
    };

    // Manejar el tiempo en el carrusel
    const handleCarouselEnter = () => {
        setCarouselStartTime(Date.now());
    };

    const handleCarouselLeave = () => {
        if (carouselStartTime) {
            const duration = (Date.now() - carouselStartTime) / 1000; // Convertir a segundos
            setCarouselTime((prev) => prev + duration);
            setCarouselStartTime(null);
        }
    };

    const memoizedSections = useMemo(() => {
        if (!searchTerm.trim()) return Object.entries(groupedSections);

        return Object.entries(groupedSections)
            .map(([sectionName, items]) => {
                const filteredItems = items.filter((item) =>
                    item.Name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    item.Description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    item.Price?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    item.Menu_Title?.toLowerCase().includes(searchTerm.toLowerCase())
                );
                return [sectionName, filteredItems] as [string, MenuItem[]];
            })
            .filter(([, items]) => items.length > 0);
    }, [groupedSections, searchTerm]);

    return (
        <div
            className={styles.menuWrapper}
            style={{
                backgroundImage: backgroundImages || 'none',
            }}
            onMouseLeave={handleSectionLeave}
        >
            <header className={styles.header}>
                <h1 className={styles.companyName}>{namecompanies}</h1>
                <input
                    type="text"
                    className={styles.searchInput}
                    placeholder="Buscar en el menú..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                {groupedSectionsPromotions && (
                    <div
                        onMouseEnter={handleCarouselEnter} // Registrar entrada al carrusel
                        onMouseLeave={handleCarouselLeave} // Registrar salida del carrusel
                    >
                        <ElegantCarouselPromotions items={groupedSectionsPromotions} />
                    </div>
                )}
            </header>

            {memoizedSections.map(([sectionName, items]) => (
                <div
                    key={sectionName}
                    className={styles.section}
                    onMouseEnter={() => handleSectionEnter(sectionName)}
                    onMouseLeave={handleSectionLeave}
                >
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
                                        priority
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}

            <footer className={styles.info}>
                <p>Total time in menu: {menuTime.toFixed(2)} seconds</p>
                <p>Time in carousel: {carouselTime.toFixed(2)} seconds</p>
                <p>Time in sections:</p>
                <ul>
                    {Object.entries(sectionTimes).map(([section, time]) => (
                        <li key={section}>
                            {section}: {time.toFixed(2)} seconds
                        </li>
                    ))}
                </ul>
            </footer>
        </div>
    );
};

export default React.memo(Menuone);
