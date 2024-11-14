'use client'

import React, { useState } from 'react'
import dynamic from 'next/dynamic'
import styles from './page.module.css'
import InputsFile from '../../components/InputFile/InputsFile'
import UpLoadElements from '../../components/upLoadElement/UpLoadElements'
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
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOk = () => {
    console.log('Click en el botón "Acción"');
  };

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <div className={styles.container}>
      <UpLoadElements>
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



      {/* <div className={styles.button} >


      </div> */}
      <div className={styles.images}>
        <ElegantGrid items={carouselItems} />
      </div>
    </div>
  );
};

export default Index;