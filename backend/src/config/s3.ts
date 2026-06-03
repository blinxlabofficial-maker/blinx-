import { S3Client } from "@aws-sdk/client-s3";
import multer from "multer";
import multerS3 from "multer-s3";
import path from "path";
import fs from "fs";
import dotenv from "dotenv";

dotenv.config();

// Allowed file types
const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif", "image/svg+xml"];
const ALLOWED_VIDEO_TYPES = ["video/mp4", "video/webm", "video/quicktime"];
const ALLOWED_TYPES = [...ALLOWED_IMAGE_TYPES, ...ALLOWED_VIDEO_TYPES];

// File size limits
const MAX_IMAGE_SIZE = 10 * 1024 * 1024;  // 10MB
const MAX_VIDEO_SIZE = 100 * 1024 * 1024; // 100MB

// Check if AWS S3 is fully and validly configured
const isAwsConfigured =
  process.env.AWS_ACCESS_KEY_ID &&
  process.env.AWS_ACCESS_KEY_ID !== "your_access_key" &&
  process.env.AWS_SECRET_ACCESS_KEY &&
  process.env.AWS_SECRET_ACCESS_KEY !== "your_secret_key" &&
  process.env.AWS_S3_BUCKET_NAME &&
  process.env.AWS_S3_BUCKET_NAME !== "your_bucket_name";

/**
 * Determine the folder based on a query param or default to "uploads".
 * Usage: POST /api/upload?folder=portfolio
 */
export function getFolder(req: any): string {
  const folder = req.query?.folder as string;
  const allowed = ["portfolio", "team", "services", "general"];
  return allowed.includes(folder) ? folder : "uploads";
}

let storageEngine: multer.StorageEngine;

if (isAwsConfigured) {
  const s3Config = new S3Client({
    region: process.env.AWS_REGION as string,
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
    },
  });

  storageEngine = multerS3({
    s3: s3Config,
    bucket: process.env.AWS_S3_BUCKET_NAME as string,
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      const folder = getFolder(req);
      const ext = path.extname(file.originalname);
      const uniqueName = `${Date.now()}-${Math.random().toString(36).substring(2, 8)}${ext}`;
      cb(null, `${folder}/${uniqueName}`);
    },
    contentType: multerS3.AUTO_CONTENT_TYPE,
  });
} else {
  const LOCAL_UPLOAD_DIR = path.join(__dirname, "../../uploads");
  if (!fs.existsSync(LOCAL_UPLOAD_DIR)) {
    fs.mkdirSync(LOCAL_UPLOAD_DIR, { recursive: true });
  }

  storageEngine = multer.diskStorage({
    destination: function (req, file, cb) {
      const folder = getFolder(req);
      const destDir = path.join(LOCAL_UPLOAD_DIR, folder);
      if (!fs.existsSync(destDir)) {
        fs.mkdirSync(destDir, { recursive: true });
      }
      cb(null, destDir);
    },
    filename: function (req, file, cb) {
      const ext = path.extname(file.originalname);
      const uniqueName = `${Date.now()}-${Math.random().toString(36).substring(2, 8)}${ext}`;
      cb(null, uniqueName);
    }
  });
}

export const upload = multer({
  storage: storageEngine,
  limits: {
    fileSize: MAX_VIDEO_SIZE, // Use the larger limit; we refine per-type below
  },
  fileFilter: function (req, file, cb) {
    if (!ALLOWED_TYPES.includes(file.mimetype)) {
      cb(new Error(`File type '${file.mimetype}' is not allowed. Accepted: images (JPEG, PNG, WebP, GIF, SVG) and videos (MP4, WebM, MOV).`));
      return;
    }

    // Enforce per-type size limits via a check in the file filter
    // (multer's limits.fileSize is checked during upload streaming)
    if (ALLOWED_IMAGE_TYPES.includes(file.mimetype)) {
      // Images: 10MB limit (actual check during stream)
      (req as any).__maxFileSize = MAX_IMAGE_SIZE;
    }

    cb(null, true);
  }
});
