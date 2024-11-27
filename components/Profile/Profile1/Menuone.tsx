import React, { useEffect, useLayoutEffect, useState } from 'react';
import Image from 'next/image';
import styles from './MenuNew.module.css';
import  backgrounImages from "../../../public/images/italia.jpg"



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
    menuData: any,
    backgroundImages: any
}

const Menuone: React.FC<MenuProps> = ({  groupedSections, namecompanies, backgroundImages }) => {



    return (
        <div
            className={styles.menuWrapper}
            style={{
                backgroundImage: backgroundImages || '/images/italia.jpg',
            }}
        >
            {Object.entries(groupedSections)?.map(([sectionName, items]) => (
                <div key={sectionName} className={styles.section}>
                    <h1 className={styles.sectionTitle}>{sectionName}</h1>
                    <div className={styles.sectionItems}>
                        {items?.map((item:any) => (
                            <div
                                key={item.Item_id}
                                className={styles.menuItem}
                                style={{
                                    backgroundImage: backgroundImages ||'/foldercompanies/LlakaScript/background-food.jpg',
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
                                        src={`/foldercompanies/${namecompanies}/${item.Item_Image}`||`/foldercompanies/LlakaScript/background-food.jpg`}
                                        alt={item.Name}
                                        width={100}
                                        height={100}
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

export default Menuone;
