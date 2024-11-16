//Move file
import fs from "fs";
import path from "path";
export const MovePictureFile = async (uploadedPictures: any, folderName: any, folderPath: any) => {

    try {
        const picturePaths = [];
        uploadedPictures.forEach((picture: any) => {
            const pictureNewPath = path.join(folderPath, picture?.originalname);
            fs.renameSync(picture.path, pictureNewPath);
            picturePaths.push(`/foldercompanies/${folderName}/${picture?.originalname}`);
        });
        return picturePaths
    } catch (error) {
        console.log("🚀 ~ CreateFolder ~ error:", error)

    }

}