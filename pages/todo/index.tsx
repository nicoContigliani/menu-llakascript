import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import ElegantCarousel from '../../components/ElegantCarousel/ElegantCarousel';
import styles from '../todo/page.module.css'



// const Carousel = dynamic(() => import('react-multi-carousel'), { ssr: false });

const carouselItems = [
  { id: 1, imageUrl: '/resto/pancho.png?height=200&width=300', title: 'Slide 1' },
  { id: 2, imageUrl: '/resto/estacionpalero.png?height=200&width=300', title: 'Slide 2' },
  { id: 3, imageUrl: '/resto/blacksheep.png?height=200&width=200', title: 'Slide 3' },
  { id: 4, imageUrl: '/resto/pancho.png?height=200&width=300', title: 'Slide 4' },
  { id: 5, imageUrl: '/resto/estacionpalero.png?height=200&width=300', title: 'Slide 5' },
];
const Index: React.FC = () => {


  return (
    <div>
      <div className={styles.container}>
        <div className={styles.images}>
          <ElegantCarousel
            items={carouselItems}
          />

        </div>
      </div>
    </div>
  );
};

export default Index;
