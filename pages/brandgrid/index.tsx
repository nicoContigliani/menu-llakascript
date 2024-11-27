'use client'

import React, { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import styles from './page.module.css'
import InputsFile from '../../components/InputFile/InputsFile'
import UpLoadElements from '../../components/upLoadElement/UpLoadElements'
import FileUpload from '../../components/FileUpload/FileUpload'
import ProfileGrid from '../../components/ProfileGrid/ElegantGrid'
// import UpLoadElements from '../../components/updateElement/UpLoadElements'

const ElegantGrid = dynamic(() => import('../../components/BrandGrid/ElegantGrid'), {
  ssr: false,
})

const Modals = dynamic(() => import('../../components/Modals/Modals'), {
  ssr: false,
})






const carouselItems = [
  { id: 1, imageUrl: '/resto/beer.png?height=200&width=300', title: 'Slide 1' },
  { id: 2, imageUrl: '/resto/estacionpalero.png?height=200&width=300', title: 'Slide 2' },
  { id: 3, imageUrl: '/resto/blacksheep.png?height=200&width=200', title: 'Slide 3' },
  { id: 4, imageUrl: '/resto/pancho.png?height=200&width=300', title: 'Slide 4' },
  { id: 5, imageUrl: '/resto/estacionpalero.png?height=200&width=300', title: 'Slide 5' },
  { id: 6, imageUrl: '/resto/pancho.png?height=200&width=300', title: 'Slide 6' },
  { id: 7, imageUrl: '/resto/estacionpalero.png?height=200&width=300', title: 'Slide 7' },
  { id: 8, imageUrl: '/resto/blacksheep.png?height=200&width=200', title: 'Slide 8' },
  { id: 9, imageUrl: '/resto/pancho.png?height=200&width=300', title: 'Slide 9' },
  { id: 10, imageUrl: '/resto/estacionpalero.png?height=200&width=300', title: 'Slide 10' },
  { id: 11, imageUrl: '/resto/pancho.png?height=200&width=300', title: 'Slide 11' },
  { id: 12, imageUrl: '/resto/estacionpalero.png?height=200&width=300', title: 'Slide 12' },
  { id: 13, imageUrl: '/resto/blacksheep.png?height=200&width=200', title: 'Slide 13' },
  { id: 14, imageUrl: '/resto/pancho.png?height=200&width=300', title: 'Slide 14' },
  { id: 15, imageUrl: '/resto/estacionpalero.png?height=200&width=300', title: 'Slide 15' },
  { id: 16, imageUrl: '/resto/pancho.png?height=200&width=300', title: 'Slide 16' },
  { id: 17, imageUrl: '/resto/estacionpalero.png?height=200&width=300', title: 'Slide 17' },
  { id: 18, imageUrl: '/resto/blacksheep.png?height=200&width=200', title: 'Slide 18' },
  { id: 19, imageUrl: '/resto/pancho.png?height=200&width=300', title: 'Slide 19' },
  { id: 20, imageUrl: '/resto/estacionpalero.png?height=200&width=300', title: 'Slide 20' },
  { id: 21, imageUrl: '/resto/pancho.png?height=200&width=300', title: 'Slide 21' },
  { id: 22, imageUrl: '/resto/estacionpalero.png?height=200&width=300', title: 'Slide 22' },
  { id: 23, imageUrl: '/resto/blacksheep.png?height=200&width=200', title: 'Slide 23' },
  { id: 24, imageUrl: '/resto/pancho.png?height=200&width=300', title: 'Slide 24' },
  { id: 25, imageUrl: '/resto/estacionpalero.png?height=200&width=300', title: 'Slide 25' },
  { id: 26, imageUrl: '/resto/pancho.png?height=200&width=300', title: 'Slide 26' },
  { id: 27, imageUrl: '/resto/estacionpalero.png?height=200&width=300', title: 'Slide 27' },
  { id: 28, imageUrl: '/resto/blacksheep.png?height=200&width=200', title: 'Slide 28' },
  { id: 29, imageUrl: '/resto/pancho.png?height=200&width=300', title: 'Slide 29' },
  { id: 30, imageUrl: '/resto/estacionpalero.png?height=200&width=300', title: 'Slide 30' },
];

const Index = () => {


  const [data, setExcelData] = useState<any | undefined>();
  const [namecompanies, setNameCompanies] = useState<any | undefined>();

  // useEffect(() => {
  //   if (nombre) {
  //     const nombre: any = router.query.nombre as string;

  //     const fetchExcelData = async () => {
  //       const formData = {
  //         folder: nombre,
  //         file: `${nombre}.xlsx`,
  //       };
  //       setNameCompanies(nombre)
  //       try {
  //         const response = await fetch("/api/readFile", {
  //           method: "POST",
  //           headers: {
  //             "Content-Type": "application/json",
  //           },
  //           body: JSON.stringify(formData),
  //         });

  //         const result = await response.json();

  //         if (response.ok) {
  //           console.log("🚀 Datos obtenidos correctamente:", result?.data);
  //           setExcelData(result.data);
  //         } else {
  //           console.error("Error al obtener los datos:", result.error || result.message);
  //         }
  //       } catch (error) {
  //         console.error("🚀 ~ Error en fetchExcelData:", error);
  //       }
  //     };

  //     fetchExcelData();
  //   }
  // }, []);




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
      {/* <UpLoadElements>
        <div className={styles.textContainer}>

          <div className={styles.title}>
            <h2>
              nueva empresa
            </h2>
          </div>
        </div>
        <div className={styles.gridItem}>
          <h5>
            Ingrese XLSM
            <InputsFile />
          </h5>
          <h5>
            Ingrese Imagen de la Marca
            <InputsFile />
          </h5>
          <h5>
            Ingrese Imagen de la Marca
            <InputsFile />
          </h5>

        </div>

      </UpLoadElements>

      <div className={styles.images}>
        <ElegantGrid items={carouselItems} />
      </div> */}
      <div>
        <h1>Upload a File</h1>
        <FileUpload />

        <ProfileGrid
          menuItems={dataMocks}
          namecompanies={"LLakaScript"}

        />
      </div>
    </div>
  );
};

export default Index;