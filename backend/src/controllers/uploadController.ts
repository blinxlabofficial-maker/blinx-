import { Request, Response } from "express";
import { upload } from "../config/s3";

/**
 * POST /api/upload — Protected
 * Upload single file to S3.
 */
export function uploadSingle(req: Request, res: Response): void {
  const multerUpload = upload.single("file");

  multerUpload(req, res, (err: any) => {
    if (err) {
      console.error("Upload error:", err);
      res.status(400).json({
        error: err.message || "File upload failed.",
        code: "UPLOAD_ERROR"
      });
      return;
    }

    if (!req.file) {
      res.status(400).json({
        error: "No file provided.",
        code: "NO_FILE"
      });
      return;
    }

    const file = req.file as Express.MulterS3.File;

    res.json({
      message: "File uploaded successfully.",
      url: file.location,
      key: file.key,
      size: file.size,
      contentType: file.contentType
    });
  });
}

/**
 * POST /api/upload/multiple — Protected
 * Upload multiple files to S3 (max 10).
 */
export function uploadMultiple(req: Request, res: Response): void {
  const multerUpload = upload.array("files", 10);

  multerUpload(req, res, (err: any) => {
    if (err) {
      console.error("Upload error:", err);
      res.status(400).json({
        error: err.message || "File upload failed.",
        code: "UPLOAD_ERROR"
      });
      return;
    }

    if (!req.files || (req.files as Express.Multer.File[]).length === 0) {
      res.status(400).json({
        error: "No files provided.",
        code: "NO_FILES"
      });
      return;
    }

    const files = (req.files as Express.MulterS3.File[]).map(file => ({
      url: file.location,
      key: file.key,
      size: file.size,
      contentType: file.contentType
    }));

    res.json({
      message: `${files.length} file(s) uploaded successfully.`,
      files
    });
  });
}
