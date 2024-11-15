import { NextApiRequest, NextApiResponse } from "next";
import multer from "multer";
import fs from "fs";
import path from "path";

// Configure Multer
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
  { name: "file", maxCount: 1 }, // File field
  { name: "picture", maxCount: 1 }, // Picture field
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
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    // Use multer middleware
    await runMiddleware(req, res, uploadMiddleware);

    const files = (req as any).files;

    if (!files || !files.file || !files.picture) {
      return res.status(400).json({ message: "File and picture are required" });
    }

    const uploadedFile = files.file[0];
    const uploadedPicture = files.picture[0];

    // Create a folder named after the uploaded file (excluding extension)
    const folderName = uploadedFile.originalname.split(".")[0];
    const folderPath = path.join(process.cwd(), "public", "foldercompanies", folderName);

    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath, { recursive: true });
    }

    // Move the file and picture into the folder
    const fileNewPath = path.join(folderPath, uploadedFile.originalname);
    const pictureNewPath = path.join(folderPath, uploadedPicture.originalname);

    fs.renameSync(uploadedFile.path, fileNewPath);
    fs.renameSync(uploadedPicture.path, pictureNewPath);

    res.status(200).json({
      message: "Files uploaded and saved successfully",
      folderPath: `/foldercompanies/${folderName}`,
      files: {
        file: `/foldercompanies/${folderName}/${uploadedFile.originalname}`,
        picture: `/foldercompanies/${folderName}/${uploadedPicture.originalname}`,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export const config = {
  api: {
    bodyParser: false, // Disable body parsing to use multer
  },
};
