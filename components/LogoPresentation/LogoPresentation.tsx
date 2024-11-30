import React from 'react'
import Image from "next/image";
import flamaSvg from "../../icons/flama.svg";
import styles from "./LogoPresentation.module.css";
const LogoPresentation = (props: any) => {
    return (
            <div className={styles.image}>
                <Image src={flamaSvg} width={350} height={250} alt="Logo" priority />
            </div>
    )
}

export default LogoPresentation