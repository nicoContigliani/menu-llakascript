import React from 'react';
import { useQRCode } from 'next-qrcode';
import styles from './page.module.css'; // Assuming you place the styles in a separate CSS file

const QrGenerator: React.FC<{ dataqrs: string; nameCompanines?: string }> = ({
  dataqrs,
  nameCompanines,
}) => {
  const { Canvas } = useQRCode();

  const handleDownload = () => {
    const canvas = document.querySelector('canvas');
    if (canvas) {
      const link = document.createElement('a') as HTMLAnchorElement; // Explicit cast
      link.href = canvas.toDataURL('image/png');
      link.download = 'qr_code.png';
      link.click();
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.titleContainer}>
        <h2 className={styles.title}>Generador de Código QR</h2>
        {nameCompanines && <p className={styles.companyName}>{nameCompanines}</p>} {/* Display company name if provided */}
      </div>
      <Canvas
        text={dataqrs}
        options={{
          errorCorrectionLevel: 'M',
          margin: 3,
          scale: 4,
          width: 200,
          color: {
            dark: '#000000ff',
            light: '#ffffffff',
          },
        }}
      />
      <button className={styles.downloadButton} onClick={handleDownload}>
        Descargar QR
      </button>
    </div>
  );
};

export default QrGenerator;