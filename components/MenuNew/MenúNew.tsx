import React, { useEffect, useLayoutEffect, useState } from 'react';
import Image from 'next/image';
import styles from './MenuNew.module.css';
import Menuone from '../Profile/Profile1/Menuone';
import Menutwo from '../Profile/Profile2/Menutwo';
import Menuthree from '../Profile/Profile3/Menuthree';
import Menufourd from '../Profile/Profile4/Menufourd';
import Menufive from '../Profile/Profile5/Menufive';
import MenuSix from '../Profile/Profile6/Menusix';
import MenuSeven from '../Profile/Profile7/Menuseven';
import MenuEight from '../Profile/Profile8/Menueight';
import MenuNine from '../Profile/Profile9/Menunine';
import Ecomerceone from '../Profile/ProfileE1/Ecomerceone';

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
    menuItems: MenuItem[];
    namecompanies: string;
}

const MenuNew: React.FC<MenuProps> = ({ menuItems, namecompanies }) => {
    const [menuData, setMenuData] = useState<MenuItem[]>([]);
    const [groupedSections, setGroupedSections] = useState<Record<string, MenuItem[]>>({});
    const [backgroundImages, setBackgroundImages] = useState<string | null>(null);
    const [profile, setSelectedProfile] = useState("")

    useLayoutEffect(() => {
        const fetchMenuData = async () => {
            try {
                const fetchedData = await new Promise<MenuItem[]>((resolve) =>
                    setTimeout(() => resolve(menuItems), 500)
                );
                setMenuData(fetchedData);
            } catch (error) {
                console.error('Error fetching menu data:', error);
                setMenuData([]);
            }
        };

        fetchMenuData();
    }, [menuItems, namecompanies])
    useLayoutEffect(() => {
        const fetchMenuData = async () => {
            try {
                if (menuItems) setSelectedProfile(menuItems[0]?.Profile_Type)
            } catch (error) {
                console.error('Error fetching menu data:', error);
            }
        };

        fetchMenuData();
    }, [menuItems, namecompanies])



    useEffect(() => {
        if (menuData?.length > 0) {
            const sections = menuData.reduce((acc, item) => {
                acc[item.Section] = acc[item.Section] || [];
                acc[item.Section].push(item);
                return acc;
            }, {} as Record<string, MenuItem[]>);
            setGroupedSections(sections);

            setBackgroundImages(
                 `url(/foldercompanies/${namecompanies}/${menuData[0]?.Background_Image})`||
                  `url(/images/italia.jpg)`
            );

        } else {
            setGroupedSections({});
            setBackgroundImages(null);
        }
    }, [menuData, namecompanies]);

    return (
        <div>
            {profile}
            {
                profile.includes("profile_one") ?
                    <Menuone
                        menuData={menuData}
                        groupedSections={groupedSections}
                        backgroundImages={backgroundImages}
                        namecompanies={namecompanies}
                    /> :

                    ""
            }
            {
                profile.includes("profile_two") ?
                    <Menutwo
                        groupedSections={groupedSections}
                        backgroundImages={backgroundImages}
                        namecompanies={namecompanies} menuData={undefined} /> :

                    ""
            }
            {
                profile.includes("profile_three") ?
                    <Menuthree
                        groupedSections={groupedSections}
                        backgroundImages={backgroundImages}
                        namecompanies={namecompanies} menuData={undefined} /> :

                    ""
            }
            {
                profile.includes("profile_fourd") ?
                    <Menufourd
                        groupedSections={groupedSections}
                        backgroundImages={backgroundImages}
                        namecompanies={namecompanies} menuData={undefined} /> :

                    ""
            }
            {
                profile.includes("profile_five") ?
                    <Menufive
                        groupedSections={groupedSections}
                        backgroundImages={backgroundImages}
                        namecompanies={namecompanies} menuData={undefined} /> :

                    ""
            }
            {
                profile.includes("profile_six") ?
                    <MenuSix
                        groupedSections={groupedSections}
                        backgroundImages={backgroundImages}
                        namecompanies={namecompanies} menuData={undefined} /> :

                    ""
            }
            {
                profile.includes("profile_seven") ?
                    <MenuSeven
                        groupedSections={groupedSections}
                        backgroundImages={backgroundImages}
                        namecompanies={namecompanies} menuData={undefined} /> :

                    ""
            }
            {
                profile.includes("profile_eight") ?
                    <MenuEight
                        groupedSections={groupedSections}
                        backgroundImages={backgroundImages}
                        namecompanies={namecompanies} menuData={undefined} /> :

                    ""
            }
            {
                profile.includes("profile_nine") ?
                    <MenuNine   
                        groupedSections={groupedSections}
                        backgroundImages={backgroundImages}
                        namecompanies={namecompanies} menuData={undefined} /> :

                    ""
            }
              {
                profile.includes("profileE_one") ?
                    <Ecomerceone   
                        groupedSections={groupedSections}
                        backgroundImages={backgroundImages}
                        namecompanies={namecompanies} /> :

                    ""
            }


        </div>
   
    );
};

export default MenuNew;

