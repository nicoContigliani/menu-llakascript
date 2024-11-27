// components/QRScanner.tsx
import React, { useState, useEffect, useRef } from 'react';
import { BrowserMultiFormatReader, DecodeHintType } from '@zxing/library';
import styles from './QrScaner.module.css';

const QRScanner = () => {
    const [qrData, setQrData] = useState<string | null>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isScanning, setIsScanning] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (isScanning && videoRef.current) {
            const codeReader = new BrowserMultiFormatReader();
            const hints = new Map();
            hints.set(DecodeHintType.POSSIBLE_FORMATS, ['QR_CODE']);

            codeReader.decodeFromVideoDevice(null, videoRef.current, (result, err) => {
                if (result) {
                    setQrData(result.getText());
                    setIsScanning(false);
                } else {
                    setError('Error al escanear el código QR. Por favor, inténtalo de nuevo.');
                }
            });

            return () => {
                codeReader.reset();
            };
        }
    }, [isScanning]);

    const startScanning = () => {
        setIsScanning(true);
        setQrData(null);
        setError(null);
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Escanear Código QR</h1>
            <button className={styles.button} onClick={startScanning} disabled={isScanning}>
                {isScanning ? 'Escaneando...' : 'Iniciar Escaneo'}
            </button>
            <div className={styles.videoContainer}>
                <video ref={videoRef} />
            </div>

            {qrData && (
                <div className={styles.resultContainer}>
                    <h2>Datos escaneados:</h2>
                    <p>{qrData}</p>
                </div>
            )}

            {error && (
                <div className={styles.errorContainer}>
                    {error}
                </div>
            )}
        </div>
    );
};

export default QRScanner;