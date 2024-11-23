import { NextApiRequest, NextApiResponse } from "next";
import path from "path";
import fs from "fs";
import { ReadExcelFile } from "../../servicesApi/ReadExcelFile.services";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        if (req.method !== "POST") {
            return res.status(405).json({ error: "Método no permitido, usa POST" });
        }

        const { folder, file } = req.body;

        // Validar parámetros
        if (!folder || typeof folder !== "string") {
            return res.status(400).json({ error: "Debes proporcionar el nombre de la carpeta (folder)" });
        }

        if (!file || typeof file !== "string") {
            return res.status(400).json({ error: "Debes proporcionar el nombre del archivo Excel (file)" });
        }

        // Construir la ruta absoluta del archivo en la carpeta `public`
        const filePath = path.join("foldercompanies", folder, file);

        // Verificar si el archivo existe
        const absolutePath = path.join(process.cwd(), "public", filePath);
        if (!fs.existsSync(absolutePath)) {
            return res.status(404).json({ error: "El archivo Excel no existe" });
        }

        // Leer el archivo Excel utilizando el servicio
        const data = await ReadExcelFile(filePath);

        // Enviar los datos como respuesta
        res.status(200).json({ data });
    } catch (error) {
        console.error("Error al procesar la solicitud:", error);
        res.status(500).json({ error: "Ocurrió un error al procesar la solicitud" });
    }
}