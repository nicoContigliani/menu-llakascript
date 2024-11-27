'use client'

import React, { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import styles from './page.module.css'


const FileUpload = dynamic(() => import('../../components/FileUpload/FileUpload'), {
  ssr: false,
})

const ProfileGrid = dynamic(() => import('../../components/ProfileGrid/ElegantGrid'), {
  ssr: false,
})



const Index = () => {


  const [data, setExcelData] = useState<any | undefined>();
  const [namecompanies, setNameCompanies] = useState<any | undefined>();

  

  const dataMocks: any[] = [
    {
      "Menu_Title": "Pizza",
      "Profile_Type": "profileE_one",
      "Primary_Color": "#33ffff",
      "Secondary_color": "#d2a700",
      "Background_Image": "background-food.jpg",
      "Item_Image": "lasagna.jpg",
      "Section": "primera",
      "Item_id": 1,
      "Name": "Lasagna",
      "Description": "asaña clásica con carne y salsa bechamel",
      "Price": "17.50",
      "profile": 1
    },
    {
      "Menu_Title": "Cucina Italiana",
      "Profile_Type": "profileE_one",
      "Primary_Color": "#9b1c31",
      "Secondary_color": "#d2a700",
      "Background_Image": "background-food.jpg",
      "Item_Image": "lasagna.jpg",
      "Section": "primera",
      "Item_id": 1,
      "Name": "Lasagna",
      "Description": "asaña clásica con carne y salsa bechamel",
      "Price": "17.50",
      "profile": 1
    },
    {
      "Menu_Title": "Cucina Italiana",
      "Profile_Type": "profileE_one",
      "Primary_Color": "#9b1c31",
      "Secondary_color": "#d2a700",
      "Background_Image": "background-food.jpg",
      "Item_Image": "lasagna.jpg",
      "Section": "primera",
      "Item_id": 1,
      "Name": "Lasagna",
      "Description": "asaña clásica con carne y salsa bechamel",
      "Price": "17.50",
      "profile": 1
    },
    {
      "Menu_Title": "Cucina Italiana",
      "Profile_Type": "profileE_one",
      "Primary_Color": "#9b1c31",
      "Secondary_color": "#d2a700",
      "Background_Image": "background-food.jpg",
      "Item_Image": "lasagna.jpg",
      "Section": "segunda",
      "Item_id": 1,
      "Name": "Lasagna",
      "Description": "asaña clásica con carne y salsa bechamel",
      "Price": "17.50",
      "profile": 1
    },
    {
      "Menu_Title": "Cucina Italiana",
      "Profile_Type": "profileE_one",
      "Primary_Color": "#9b1c31",
      "Secondary_color": "#d2a700",
      "Background_Image": "background-food.jpg",
      "Item_Image": "lasagna.jpg",
      "Section": "segunda",
      "Item_id": 1,
      "Name": "Lasagna",
      "Description": "asaña clásica con carne y salsa bechamel",
      "Price": "17.50",
      "profile": 1
    },
    {
      "Menu_Title": "Pizza",
      "Profile_Type": "profileE_one",
      "Primary_Color": "#33ffff",
      "Secondary_color": "#d2a700",
      "Background_Image": "background-food.jpg",
      "Item_Image": "lasagna.jpg",
      "Section": "primera",
      "Item_id": 1,
      "Name": "Lasagna",
      "Description": "asaña clásica con carne y salsa bechamel",
      "Price": "17.50",
      "profile": 1
    },
    {
      "Menu_Title": "Cucina Italiana",
      "Profile_Type": "profileE_one",
      "Primary_Color": "#9b1c31",
      "Secondary_color": "#d2a700",
      "Background_Image": "background-food.jpg",
      "Item_Image": "lasagna.jpg",
      "Section": "primera",
      "Item_id": 1,
      "Name": "Lasagna",
      "Description": "asaña clásica con carne y salsa bechamel",
      "Price": "17.50",
      "profile": 1
    },
    {
      "Menu_Title": "Cucina Italiana",
      "Profile_Type": "profileE_one",
      "Primary_Color": "#9b1c31",
      "Secondary_color": "#d2a700",
      "Background_Image": "background-food.jpg",
      "Item_Image": "lasagna.jpg",
      "Section": "primera",
      "Item_id": 1,
      "Name": "Lasagna",
      "Description": "asaña clásica con carne y salsa bechamel",
      "Price": "17.50",
      "profile": 1
    },
    {
      "Menu_Title": "Cucina Italiana",
      "Profile_Type": "profileE_one",
      "Primary_Color": "#9b1c31",
      "Secondary_color": "#d2a700",
      "Background_Image": "background-food.jpg",
      "Item_Image": "lasagna.jpg",
      "Section": "segunda",
      "Item_id": 1,
      "Name": "Lasagna",
      "Description": "asaña clásica con carne y salsa bechamel",
      "Price": "17.50",
      "profile": 1
    },
    {
      "Menu_Title": "Cucina Italiana",
      "Profile_Type": "profileE_one",
      "Primary_Color": "#9b1c31",
      "Secondary_color": "#d2a700",
      "Background_Image": "background-food.jpg",
      "Item_Image": "lasagna.jpg",
      "Section": "segunda",
      "Item_id": 1,
      "Name": "Lasagna",
      "Description": "asaña clásica con carne y salsa bechamel",
      "Price": "17.50",
      "profile": 1
    },
    {
      "Menu_Title": "Pizza",
      "Profile_Type": "profileE_one",
      "Primary_Color": "#33ffff",
      "Secondary_color": "#d2a700",
      "Background_Image": "background-food.jpg",
      "Item_Image": "lasagna.jpg",
      "Section": "primera",
      "Item_id": 1,
      "Name": "Lasagna",
      "Description": "asaña clásica con carne y salsa bechamel",
      "Price": "17.50",
      "profile": 1
    },
    {
      "Menu_Title": "Cucina Italiana",
      "Profile_Type": "profileE_one",
      "Primary_Color": "#9b1c31",
      "Secondary_color": "#d2a700",
      "Background_Image": "background-food.jpg",
      "Item_Image": "lasagna.jpg",
      "Section": "primera",
      "Item_id": 1,
      "Name": "Lasagna",
      "Description": "asaña clásica con carne y salsa bechamel",
      "Price": "17.50",
      "profile": 1
    },
    {
      "Menu_Title": "Cucina Italiana",
      "Profile_Type": "profileE_one",
      "Primary_Color": "#9b1c31",
      "Secondary_color": "#d2a700",
      "Background_Image": "background-food.jpg",
      "Item_Image": "lasagna.jpg",
      "Section": "primera",
      "Item_id": 1,
      "Name": "Lasagna",
      "Description": "asaña clásica con carne y salsa bechamel",
      "Price": "17.50",
      "profile": 1
    },
    {
      "Menu_Title": "Cucina Italiana",
      "Profile_Type": "profileE_one",
      "Primary_Color": "#9b1c31",
      "Secondary_color": "#d2a700",
      "Background_Image": "background-food.jpg",
      "Item_Image": "lasagna.jpg",
      "Section": "segunda",
      "Item_id": 1,
      "Name": "Lasagna",
      "Description": "asaña clásica con carne y salsa bechamel",
      "Price": "17.50",
      "profile": 1
    },
    {
      "Menu_Title": "Cucina Italiana",
      "Profile_Type": "profileE_one",
      "Primary_Color": "#9b1c31",
      "Secondary_color": "#d2a700",
      "Background_Image": "background-food.jpg",
      "Item_Image": "lasagna.jpg",
      "Section": "segunda",
      "Item_id": 1,
      "Name": "Lasagna",
      "Description": "asaña clásica con carne y salsa bechamel",
      "Price": "17.50",
      "profile": 1
    },
    {
      "Menu_Title": "Pizza",
      "Profile_Type": "profileE_one",
      "Primary_Color": "#33ffff",
      "Secondary_color": "#d2a700",
      "Background_Image": "background-food.jpg",
      "Item_Image": "lasagna.jpg",
      "Section": "primera",
      "Item_id": 1,
      "Name": "Lasagna",
      "Description": "asaña clásica con carne y salsa bechamel",
      "Price": "17.50",
      "profile": 1
    },
    {
      "Menu_Title": "Cucina Italiana",
      "Profile_Type": "profileE_one",
      "Primary_Color": "#9b1c31",
      "Secondary_color": "#d2a700",
      "Background_Image": "background-food.jpg",
      "Item_Image": "lasagna.jpg",
      "Section": "primera",
      "Item_id": 1,
      "Name": "Lasagna",
      "Description": "asaña clásica con carne y salsa bechamel",
      "Price": "17.50",
      "profile": 1
    },
    {
      "Menu_Title": "Cucina Italiana",
      "Profile_Type": "profileE_one",
      "Primary_Color": "#9b1c31",
      "Secondary_color": "#d2a700",
      "Background_Image": "background-food.jpg",
      "Item_Image": "lasagna.jpg",
      "Section": "primera",
      "Item_id": 1,
      "Name": "Lasagna",
      "Description": "asaña clásica con carne y salsa bechamel",
      "Price": "17.50",
      "profile": 1
    },
    {
      "Menu_Title": "Cucina Italiana",
      "Profile_Type": "profileE_one",
      "Primary_Color": "#9b1c31",
      "Secondary_color": "#d2a700",
      "Background_Image": "background-food.jpg",
      "Item_Image": "lasagna.jpg",
      "Section": "segunda",
      "Item_id": 1,
      "Name": "Lasagna",
      "Description": "asaña clásica con carne y salsa bechamel",
      "Price": "17.50",
      "profile": 1
    },
    {
      "Menu_Title": "Cucina Italiana",
      "Profile_Type": "profileE_one",
      "Primary_Color": "#9b1c31",
      "Secondary_color": "#d2a700",
      "Background_Image": "background-food.jpg",
      "Item_Image": "lasagna.jpg",
      "Section": "segunda",
      "Item_id": 1,
      "Name": "Lasagna",
      "Description": "asaña clásica con carne y salsa bechamel",
      "Price": "17.50",
      "profile": 1
    }
  ]









  return (
    <div className={styles.container}>
  
      <div  >
        <div className={styles.titleApp}>
          <h1>Crear Empresa</h1>
        </div>
<hr />
        <div>
          <FileUpload />
        </div>
        <div>
          <ProfileGrid
            menuItems={dataMocks}
            namecompanies={"LLakaScript"}
          />

        </div>
      </div>
    </div>
  );
};

export default Index;