'use client'

import React, { useEffect, useLayoutEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import styles from './ElegantGrid.module.css'
import MenuNew from '../MenuNew/MenúNew';
import Menuone from '../Profile/Profile1/Menuone';
import Image from 'next/image';
import backgrounImage from "../../public/images/italia.jpg"

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


// Array con los componentes de perfil
const profiles = [
  { name: 'Profile1', path: 'Profile1/Menuone' },
  { name: 'Profile2', path: 'Profile2/Menutwo' },
  { name: 'Profile3', path: 'Profile3/Menuthree' },
  { name: 'Profile4', path: 'Profile4/Menufourd' },
  { name: 'Profile5', path: 'Profile5/Menufive' },
  { name: 'Profile6', path: 'Profile6/Menusix' },
  { name: 'Profile7', path: 'Profile7/Menuseven' },
  { name: 'Profile8', path: 'Profile8/Menueight' },
  { name: 'Profile9', path: 'Profile9/Menunine' },
];

// Mapea los componentes dinámicamente
const dynamicProfiles: any = profiles?.map(profile => ({
  name: profile.name,
  component: dynamic(() => import(`../../components/Profile/${profile.path}`), { ssr: false }),
}));



const backgroundImage:string='`url(/foldercompanies/${namecompanies}/${menuData[0]?.Background_Image})`'


const ProfileGrid = (props: any) => {
  const { menuItems, namecompanies } = props

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



  useLayoutEffect(() => {
    if (menuData?.length > 0) {
      const sections = menuData.reduce((acc, item) => {
        acc[item.Section] = acc[item.Section] || [];
        acc[item.Section].push(item);
        return acc;
      }, {} as Record<string, MenuItem[]>);
      setGroupedSections(sections);

      setBackgroundImages(
        `url(/foldercompanies/${namecompanies}/${menuData[0]?.Background_Image})`
      );

    } else {
      setGroupedSections({});
      setBackgroundImages(null);
    }
  }, [menuData, namecompanies]);


  return (
    <div className={styles.container}>
   
      {dynamicProfiles.map(({ name, component: Component }) => (
        <div key={name}>
          <h1>{name}</h1>
          <hr />
          <Component
            menuData={menuData}
            groupedSections={groupedSections}
            backgroundImages={backgroundImages}
            namecompanies={namecompanies}
          />
        </div>
      ))}



    </div>
  );
};

export default ProfileGrid;
