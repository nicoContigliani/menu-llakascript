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
    backgroundImages: string;
}

const MenuItemCard: React.FC<{ item: MenuItem; namecompanies: string }> = ({ item, namecompanies }) => (
    <div className={styles.menuItem}>
        <h1 className={styles?.companyName}>{namecompanies}</h1>
        <hr />

        <div className={styles.itemImage}>
            <Image
                src={`/foldercompanies/${namecompanies}/${item.Item_Image}`}
                alt={item.Name}
                width={150}
                height={150}
                layout="fixed"
                objectFit="cover"
                className={styles.image}
            />
        </div>
        <div className={styles.itemInfo}>
            <h3 className={styles.itemName}>{item.Name}</h3>
            <p className={styles.itemDescription}>{item.Description}</p>
            <span className={styles.itemPrice}>${item.Price}</span>
        </div>
    </div>
);

const Ecomerceone: React.FC<MenuProps> = ({ groupedSections, namecompanies, backgroundImages }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;

    // Flatten groupedSections and memoize the result to avoid recomputing
    const allItems = useMemo(() => Object.values(groupedSections).flat(), [groupedSections]);

    // Filter items based on search query (case-insensitive)
    const filteredItems = useMemo(() => {
        if (!searchQuery) return allItems;
        const query = searchQuery.toLowerCase();
        return allItems.filter(
            (item) =>
                item.Menu_Title.toLowerCase().includes(query) ||
                item.Description.toLowerCase().includes(query)
        );
    }, [allItems, searchQuery]);

    // Paginate filtered items
    const paginatedItems = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return filteredItems.slice(startIndex, endIndex);
    }, [filteredItems, currentPage]);

    // Calculate the total number of pages
    const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

    // Handle page change
    const handlePageChange = (page: number) => {
        if (page < 1 || page > totalPages) return;
        setCurrentPage(page);
    };

    return (
        <div
            className={styles.menuWrapper}
            style={{
                backgroundImage: backgroundImages || 'none',
            }}
        >
            <h1 className={styles.companyNameTitle}>{namecompanies}</h1>

            <div className={styles.searchBar}>
                <input
                    type="text"
                    placeholder="Search items..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>
            <div className={styles.sections}>
                {paginatedItems.map((item) => (
                    <MenuItemCard key={item.Item_id} item={item} namecompanies={namecompanies} />
                ))}
            </div>
            <div className={styles.pagination}>
                <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    Previous
                </button>
                {[...Array(totalPages)].map((_, index) => (
                    <button
                        key={index}
                        onClick={() => handlePageChange(index + 1)}
                        className={currentPage === index + 1 ? styles.activePage : ''}
                    >
                        {index + 1}
                    </button>
                ))}
                si
                <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default Ecomerceone;
