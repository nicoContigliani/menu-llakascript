//Move file
import fs from "fs";
import path from "path";
export const MovePrincipalFile = async (uploadedFile: any, folderName: any, folderPath: any) => {

    try {
        const fileNewPath = path.join(folderPath, uploadedFile.originalname);
        fs.renameSync(uploadedFile.path, fileNewPath);
        return true
    } catch (error) {
        console.log("🚀 ~ CreateFolder ~ error:", error)

    }

}