// qrcode.react.d.ts
declare module 'qrcode.react' {
    import React from 'react';

    export interface QRCodeProps {
        id: any;
        value: string; // Contenido del código QR
        size?: number; // Tamaño en píxeles
        bgColor?: string; // Color de fondo
        fgColor?: string; // Color del código QR
        level?: 'L' | 'M' | 'Q' | 'H'; // Nivel de corrección de errores
        includeMargin?: boolean; // Añadir margen
        ref:any;
    }

    const QRCode: React.FC<QRCodeProps>;

    export default QRCode;
}