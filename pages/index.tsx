import Link from "next/link";
import Layout from "../components/Layout";
import styles from "./index.module.css";
import Image from "next/image";
import flamaSvg from "../icons/flama.svg";
import QRScanner from "../components/QrScanner/QrScanner";

const IndexPage = () => (
  <div className={styles.body}>
    {/* Main Content */}
    <div className={styles.container}>
      {/* Logo Section */}
      <div className={styles.image}>
        <Image src={flamaSvg} width={350} height={200} alt="Logo" />
      </div>

      {/* Titles Section */}
      <div className={styles.textContainer}>
        <h1 className={styles.title}>LlakaScript</h1>
        <h2 className={styles.titleApp}>Menu</h2>
      </div>

      {/* Buttons Section */}
      <div className={styles.buttonContainer}>
        <Link href="/companies/LlakaScript" className={styles.link}>
          LlakaScript
        </Link>
        <Link href="/brandgrid" className={styles.link}>
          Empresa
        </Link>
      </div>
    </div>
    {/* QR Scanner Section */}
    <div className={styles.qrContainer}>
      <QRScanner />
    </div>


  </div>
);

export default IndexPage;
