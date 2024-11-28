import { NextApiRequest, NextApiResponse } from "next";
import multer from "multer";
import fs from "fs";
import path from "path";
import { CreateFolder } from "../../servicesApi/CreateFolder.services";
import { MovePrincipalFile } from "../../servicesApi/MovePrincipalFile.services";
import { MovePictureFile } from "../../servicesApi/MovePicturesFile.services";
import { ReadExcelFile } from "../../servicesApi/ReadExcelFile.services";

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
            return res.status(400).json({ message: "El archivo y las imágenes son obligatorios",dataqr:"",namecompaines:"" });
        }

        const uploadedFile = files.file[0];
        const uploadedPictures = files.pictures;


        //create Folder 
        const { folderName, folderPath } = await CreateFolder(uploadedFile, "public", "foldercompanies")
        //Move principal file
        const todo = MovePrincipalFile(uploadedFile, folderName, folderPath)


        //Move picture files
        const picturePaths = await MovePictureFile(uploadedPictures, folderName, folderPath)
        console.log("🚀 ~ handler ~ picturePaths:", picturePaths)


        const filePath = path.join(process.cwd(), "public", "foldercompanies", folderName, uploadedFile.originalname);

        if (!fs.existsSync(filePath)) {
            throw new Error(`El archivo no existe en la ruta especificada: ${filePath}`);
        }


        const returnData = await ReadExcelFile(`foldercompanies/${folderName}/${uploadedFile.originalname}`);

        console.log("🚀 ~ handler ~ returnData:", returnData)


        const qrDAta = `https://menu-nicocontigliani.netlify.app/companies/${folderName}`



        res.status(200).json({
            namecompaines: folderName,
            dataqr: qrDAta,
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
