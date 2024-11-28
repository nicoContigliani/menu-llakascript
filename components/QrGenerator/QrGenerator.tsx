import React, { useEffect, useState } from 'react';
import { useQRCode } from 'next-qrcode';
import styles from './page.module.css'; // Assuming you place the styles in a separate CSS file

const QrGenerator: React.FC<{ dataqrs: string; nameCompanines?: string }> = ({
  dataqrs,
  nameCompanines,
}) => {
  const { Canvas } = useQRCode();
  const [isClient, setIsClient] = useState(false);

  // Ensure that the code runs only on the client-side
  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleDownload = () => {
    if (typeof window !== 'undefined') {
      const canvas = document.querySelector('canvas');
      if (canvas) {
        const link = document.createElement('a') as HTMLAnchorElement; // Type assertion
        link.href = canvas.toDataURL('image/png');
        link.download = 'qr_code.png';
        link.click();
      }
    }
  };

  if (!isClient) {
    // Return null or a loading message while client-side JavaScript is initializing
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.titleContainer}>
        <h2 className={styles.title}>Generador de Código QR</h2>
        {nameCompanines && <p className={styles.companyName}>{nameCompanines}</p>}
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
