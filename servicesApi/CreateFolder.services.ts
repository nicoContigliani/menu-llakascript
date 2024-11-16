//create folder
import fs from "fs";
import path from "path";


export const CreateFolder = async (
    uploadedFile: any | any[],
    principalfolder: string,
    secondaryfolder: string
) => {
    try {
        const folderName = uploadedFile.originalname.split(".")[0];
        const folderPath = path.join(
            process.cwd(),
            `${principalfolder || "public"}`,
            `${secondaryfolder || "foldercompanies"}`,
            folderName
        );

        if (!fs.existsSync(folderPath)) {
            fs.mkdirSync(folderPath, { recursive: true });
        }

        return { folderName, folderPath };
    } catch (error) {
        console.error("Error creating folder:", error);
        throw new Error("An error occurred while creating the folder");
    }
};