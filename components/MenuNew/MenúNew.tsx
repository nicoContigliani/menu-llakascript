import React, { useEffect, useLayoutEffect, useState, useMemo } from 'react';
import dynamic from 'next/dynamic';
import styles from './MenuNew.module.css';

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
    hojas?: { Hoja1?: any[],Promotion:any[] }
    status_Companies?: true,
    visits?: 0,
    licence?: any[],
    infoVisits?: any[],
    loyaltyProgram?: any[],
    delivery?: any[],
    trafficStats?: any[],
    marketingCampaigns?: any[],
    giftCards?: any[],
    badcustomer?: any[],
    godcustomer?: any[],
    raiting?: number,
    latitude?: string,
    longitudestring,
    createAt?: string,
    updateAt?: string



}

interface MenuProps {
    menuItems: { hojas: { Hoja1: MenuItem[],Promotion: MenuItem[] } };
    namecompanies: string;
}

// Importación dinámica para los perfiles
const profileComponents = {
    profile_one: dynamic(() => import('../Profile/Profile1/Menuone')),
    profile_two: dynamic(() => import('../Profile/Profile2/Menutwo')),
    profile_three: dynamic(() => import('../Profile/Profile3/Menuthree')),
    profile_fourd: dynamic(() => import('../Profile/Profile4/Menufourd')),
    profile_five: dynamic(() => import('../Profile/Profile5/Menufive')),
    profile_six: dynamic(() => import('../Profile/Profile6/Menusix')),
    profile_seven: dynamic(() => import('../Profile/Profile7/Menuseven')),
    profile_eight: dynamic(() => import('../Profile/Profile8/Menueight')),
    profile_nine: dynamic(() => import('../Profile/Profile9/Menunine')),
    profile_ten: dynamic(() => import('../Profile/Profile10/Menuten')),
    profile_eleven: dynamic(() => import('../Profile/Profile11/Menueleven')),
    profile_twelve: dynamic(() => import('../Profile/Profile12/Menutwelve')),
    profile_thirteen: dynamic(() => import('../Profile/Profile13/Menuthirteen')),
    profileE_one: dynamic(() => import('../Profile/ProfileE1/Ecomerceone')),
};

const MenuNew: React.FC<MenuProps> = ({ menuItems, namecompanies }) => {
    console.log("🚀 ~ menuItems:", menuItems)
    const [menuData, setMenuData] = useState<MenuItem[]>([]);
    const [menuDataPromotions, setMenuDataPromotions] = useState<MenuItem[]>([]);


    const [profile, setProfile] = useState<string>('');
    const [backgroundImage, setBackgroundImage] = useState<string | null>(null);

    // Agrupamiento de secciones con useMemo
    const groupedSections = useMemo(() => {
        return menuData?.reduce<Record<string, MenuItem[]>>((acc, item) => {
            acc[item.Section] = acc[item.Section] || [];
            acc[item.Section].push(item);
            return acc;
        }, {});
    }, [menuData]);
//   const groupedSectionsPromotions = useMemo(() => {
//       return menuDataPromotions?.reduce<Record<string, MenuItem[]>>((acc, item) => {
//           acc[item.Section] = acc[item.Section] || [];
//           acc[item.Section].push(item);
//           return acc;
//         }, {});
//     }, [menuData]);
    

    // Cargar datos del menú
    useLayoutEffect(() => {
        const fetchMenuData = () => {
            try {
                // Validar si menuItems y hojas están disponibles
                const data = menuItems?.hojas?.Hoja1 ?? [];
                const PromotionsData = menuItems?.hojas?.Promotion ?? [];

                // Establecer datos del menú
                setMenuData(data);
                setMenuDataPromotions(PromotionsData)
                // Configurar el perfil seleccionado solo si hay datos
                if (data.length > 0) {
                    setProfile(data[0]?.Profile_Type ?? '');
                }
            } catch (error) {
                console.error('Error fetching menu data:', error);
                // Si ocurre un error, reinicia los datos
                setMenuData([]);
                setProfile('');
            }
        };

        fetchMenuData();
    }, [menuItems]);

    // Configurar la imagen de fondo
    useEffect(() => {
        if (menuData?.length > 0) {
            const backgroundImageUrl =
                `url(/foldercompanies/${namecompanies}/${menuData[0]?.Background_Image})` ||
                `url(/images/italia.jpg)`;
            setBackgroundImage(backgroundImageUrl);
        }
    }, [menuData, namecompanies]);
    // Componente dinámico seleccionado
    const SelectedProfileComponent = profileComponents[profile] || null;

    return (
        <div className={styles.container}>
            {SelectedProfileComponent ? (
                <SelectedProfileComponent
                    menuData={menuData}
                    groupedSections={groupedSections}
                    backgroundImages={backgroundImage}
                    namecompanies={namecompanies}
                    groupedSectionsPromotions={menuDataPromotions}
                />
            ) : (
                <p>Loading profile...</p>
            )}
        </div>
    );
};

export default MenuNew;
