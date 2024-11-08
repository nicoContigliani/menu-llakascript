import React from 'react'
import Image from 'next/image'
import flamaSvg from '../../icons/flama.svg';
import styles from './logo.module.css'


const Logo = () => {
    return (
        <div className={styles.image}>
            <Image src={flamaSvg}  alt="Logo" />
        </div>
    )
}

export default Logo