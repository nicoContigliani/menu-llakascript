import React from "react";
import styles from "./Headers.module.css";

interface HeaderProps {
  logo: string;  // Aquí asumo que logo es una URL del logo
  title: string; // Nombre o título
}

const Header: React.FC<HeaderProps> = ({ logo, title }) => {
  return (
    <header className={styles.header}>
      <div className={styles.logoContainer}>
        <img src={logo} alt="Logo" className={styles.logo} />
        <h1 className={styles.title}>{title}</h1>
      </div>
      <nav className={styles.nav}>
        <ul className={styles.navList}>
          <li className={styles.navItem}>
            <a href="#home">Home</a>
          </li>
          <li className={styles.navItem}>
            <a href="#about">About</a>
          </li>
          <li className={styles.navItem}>
            <a href="#services">Services</a>
          </li>
          <li className={styles.navItem}>
            <a href="#contact">Contact</a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;