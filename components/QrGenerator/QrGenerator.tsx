import React from 'react'
import { useQRCode } from 'next-qrcode'

const QrGenerator = ({ dataqrs, nameCompanines }) => {
    const { Image } = useQRCode()

    return (
        <div>
            {dataqrs ? (
                <Image
                    text={dataqrs as string} 
                    options={{
                        type: 'image/jpeg',
                        quality: 0.3,
                        errorCorrectionLevel: 'M',
                        margin: 3,
                        scale: 4,
                        width: 200,
                        color: {
                            dark: '#010599FF',
                            light: '#FFBF60FF',
                        },
                    }}
                />
            ) : (
                ""
            )}
        </div>
    )
}

export default QrGenerator
