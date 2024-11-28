import React from 'react'
import Logo from '../Logo/Logo'
import styles from './headers.module.css'
const HeaderBody = () => {
    return (
        <div className={styles.container}>
            <div className={styles.image}>
                <Logo />

            </div>
            <div className={styles.title}>LlakaScript</div>



        </div>
    )
}

export default HeaderBody