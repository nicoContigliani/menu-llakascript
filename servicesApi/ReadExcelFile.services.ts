import path from "path";
import fs from "fs";
import * as XLSX from "xlsx";

export async function ReadExcelFile(filePath: string): Promise<any[]> {
    try {
        // Ensure the file path is absolute
        const absolutePath = path.join(process.cwd(), "public", filePath);

        // Read the Excel file
        const fileBuffer = fs.readFileSync(absolutePath);

        // Parse the Excel file
        const workbook = XLSX.read(fileBuffer, { type: "buffer" });

        // Select the first sheet
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];

        // Convert the sheet to JSON
        const data = XLSX.utils.sheet_to_json(sheet);

        return data; // Return data in JSON format
    } catch (error) {
        console.error("Error al leer el archivo Excel:", error);
        throw new Error("No se pudo leer el archivo Excel.");
    }
}
