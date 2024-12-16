// import path from "path";
// import fs from "fs";
// import * as XLSX from "xlsx";

// export async function ReadExcelFile(filePath: string): Promise<any[]> {
//     try {
//         // Ensure the file path is absolute
//         const absolutePath = path.join(process.cwd(), "public", filePath);

//         // Read the Excel file
//         const fileBuffer = fs.readFileSync(absolutePath);

//         // Parse the Excel file
//         const workbook = XLSX.read(fileBuffer, { type: "buffer" });

//         // Select the first sheet
//         const sheetName = workbook.SheetNames[0];
//         const sheet = workbook.Sheets[sheetName];

//         // Convert the sheet to JSON
//         const data = XLSX.utils.sheet_to_json(sheet);

//         return data; // Return data in JSON format
//     } catch (error) {
//         console.error("Error al leer el archivo Excel:", error);
//         throw new Error("No se pudo leer el archivo Excel.");
//     }
// }
import path from "path";
import fs from "fs";
import * as XLSX from "xlsx";

export async function ReadExcelFile(filePath: string): Promise<Record<string, any[]>> {
    try {
        const absolutePath = path.join(process.cwd(), "public", filePath);
        const fileBuffer = fs.readFileSync(absolutePath);
        const workbook = XLSX.read(fileBuffer, { type: "buffer" });

        const data: Record<string, any[]> = {};
        workbook.SheetNames.forEach((sheetName) => {
            const sheet = workbook.Sheets[sheetName];
            data[sheetName] = XLSX.utils.sheet_to_json(sheet);
        });

        return data; // Devuelve un objeto con los nombres de las hojas como claves y los datos como valores.
    } catch (error) {
        console.error("Error al leer el archivo Excel:", error);
        throw new Error("No se pudo leer el archivo Excel.");
    }
}