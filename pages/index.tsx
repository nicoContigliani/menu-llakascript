import dynamic from "next/dynamic";
import Link from "next/link";
import Image from "next/image";
import styles from "./index.module.css";
import flamaSvg from "../icons/flama.svg";

// Importación dinámica del componente QRScanner
const QRScanner = dynamic(() => import("../components/QrScanner/QrScanner"), {
  ssr: false, // Desactiva el renderizado del servidor si usa APIs del navegador
  loading: () => <p>Loading QR Scanner...</p>, // Muestra un indicador de carga
});

const IndexPage = () => (
  <div className={styles.body}>
    {/* Main Content */}
    <div className={styles.container}>
      {/* Logo Section */}
      <div className={styles.image}>
        <Image src={flamaSvg} width={350} height={250} alt="Logo" priority />
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
