import { NextApiRequest, NextApiResponse } from "next";
import multer from "multer";
import fs from "fs";
import path from "path";

// Multer configuration
const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      const publicDir = path.join(process.cwd(), "public", "foldercompanies");
      if (!fs.existsSync(publicDir)) {
        fs.mkdirSync(publicDir, { recursive: true }); // Ensure the folder exists
      }
      cb(null, publicDir);
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname); // Save the file with its original name
    },
  }),
});

const uploadMiddleware = upload.single("file");

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
    // Run the multer middleware
    await runMiddleware(req, res, uploadMiddleware);

    const file = (req as any).file;

    if (!file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    // Create a folder inside "public/foldercompanies" with the file name (excluding extension)
    const folderName = file.originalname.split(".")[0];
    const folderPath = path.join(process.cwd(), "public", "foldercompanies", folderName);

    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath, { recursive: true });
    }

    // Move the uploaded file into the new folder
    const oldPath = path.join(process.cwd(), "public", "foldercompanies", file.originalname);
    const newPath = path.join(folderPath, file.originalname);

    fs.renameSync(oldPath, newPath);

    res.status(200).json({
      message: "File uploaded and saved successfully",
      folderPath: `/foldercompanies/${folderName}/${file.originalname}`,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export const config = {
  api: {
    bodyParser: false, // Disables the default body parser so Multer can handle the request
  },
};
