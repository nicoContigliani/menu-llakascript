import React from 'react'
import { useQRCode } from 'next-qrcode'
import ShareButtons from '../SocialShare/ShareButton'

const QrGenerator = ({ dataqrs, nameCompanines }) => {
    const { Image } = useQRCode()

    return (
        <div>
            {dataqrs ? (
                <div>

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
                    <ShareButtons url={dataqrs} title={'QR de ' + nameCompanines}
                    />
                </div>
            ) : (
                ""
            )}
        </div>
    )
}

export default QrGenerator
