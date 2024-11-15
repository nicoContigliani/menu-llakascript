import { NextApiRequest, NextApiResponse } from "next";
import multer from "multer";
import fs from "fs";
import path from "path";

// Configuración de Multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const publicDir = path.join(process.cwd(), "public", "foldercompanies");
        if (!fs.existsSync(publicDir)) {
            fs.mkdirSync(publicDir, { recursive: true });
        }
        cb(null, publicDir);
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});

const upload = multer({ storage });

const uploadMiddleware = upload.fields([
    { name: "file", maxCount: 1 },      // Campo único para el archivo principal
    { name: "pictures", maxCount: 10 }, // Campo múltiple para las imágenes
]);

function runMiddleware(req: NextApiRequest, res: NextApiResponse, fn: Function) {
    return new Promise((resolve, reject) => {
        fn(req, res, (result: any) => {
            if (result instanceof Error) {
                return reject(result);
            }
            return resolve(result);
        });
    });
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Método no permitido" });
    }

    try {
        // Ejecutar el middleware de multer
        await runMiddleware(req, res, uploadMiddleware);

        const files = (req as any).files;

        if (!files || !files.file || !files.pictures) {
            return res.status(400).json({ message: "El archivo y las imágenes son obligatorios" });
        }

        const uploadedFile = files.file[0];
        const uploadedPictures = files.pictures;

        // Crear una carpeta con el nombre del archivo (sin extensión)
        const folderName = uploadedFile.originalname.split(".")[0];
        const folderPath = path.join(process.cwd(), "public", "foldercompanies", folderName);

        if (!fs.existsSync(folderPath)) {
            fs.mkdirSync(folderPath, { recursive: true });
        }

        // Mover el archivo principal a la carpeta
        const fileNewPath = path.join(folderPath, uploadedFile.originalname);
        fs.renameSync(uploadedFile.path, fileNewPath);

        // Mover las imágenes a la carpeta
        const picturePaths = [];
        uploadedPictures.forEach((picture: any) => {
            const pictureNewPath = path.join(folderPath, picture.originalname);
            fs.renameSync(picture.path, pictureNewPath);
            picturePaths.push(`/foldercompanies/${folderName}/${picture.originalname}`);
        });

        res.status(200).json({
            message: "Archivos subidos y guardados con éxito",
            folderPath: `/foldercompanies/${folderName}`,
            files: {
                file: `/foldercompanies/${folderName}/${uploadedFile.originalname}`,
                pictures: picturePaths,
            },
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
}

export const config = {
    api: {
        bodyParser: false, // Desactiva el análisis del cuerpo para usar multer
    },
};
