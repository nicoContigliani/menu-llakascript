import fs from "fs";
import path from "path";
import xlsx from "xlsx";
import clientPromise from "../../utils/mongodb";
import { promisify } from "util";

const readdir = promisify(fs.readdir);
const stat = promisify(fs.stat);

async function readExcelData(filePath: string) {
    const workbook = xlsx.readFile(filePath);
    const allSheetData: { [key: string]: any[] } = {};

    workbook.SheetNames.forEach((sheetName) => {
        allSheetData[sheetName] = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);
    });

    return allSheetData;
}

async function processFoldersAndUpdateMongo(basePath: string) {
    const client = await clientPromise;
    const db = client.db("menuDB");
    const companiesCollection = db.collection("companies");

    try {
        // Leer todas las carpetas en la ruta base
        const folders = await readdir(basePath);

        for (const folder of folders) {
            const folderPath = path.join(basePath, folder);
            const stats = await stat(folderPath);

            // Verificar que es un directorio
            if (stats.isDirectory()) {
                const files = await readdir(folderPath);

                for (const file of files) {
                    if (file.endsWith(".xlsx")) {
                        const filePath = path.join(folderPath, file);
                        const allSheetData = await readExcelData(filePath);

                        const companyName = file.replace(".xlsx", "");
                        const folderName = folder;

                        // Buscar en MongoDB si la compañía ya existe
                        const existingCompany = await companiesCollection.findOne({ companyName });

                        if (existingCompany) {
                            // Actualizar documento existente
                            await companiesCollection.updateOne(
                                { companyName },
                                { $set: { folderName, hojas: allSheetData } }
                            );
                            console.log(`Updated existing company: ${companyName}`);
                        } else {
                            // Insertar nuevo documento
                            await companiesCollection.insertOne({
                                companyName,
                                folderName,
                                hojas: allSheetData,
                                visits: 0,
                                // ubication:
                                createAt: new Date(),
                                updateAt: new Date()
                            });
                            console.log(`Inserted new company: ${companyName}`);
                        }
                    }
                }
            }
        }
        return { success: true, message: "Data processed and MongoDB updated." };
    } catch (error) {
        console.error("Error processing folders:", error);
        return { success: false, message: "Error processing folders." };
    }
}

export default async function handler(req: any, res: any) {
    if (req.method !== "GET") {
        return res.status(405).json({ message: "Method not allowed" });
    }

    const basePath = path.join(process.cwd(), "public/foldercompanies");

    const result = await processFoldersAndUpdateMongo(basePath);

    if (result.success) {
        res.status(200).json({ message: result.message });
    } else {
        res.status(500).json({ message: result.message });
    }
}
