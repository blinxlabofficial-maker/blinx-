import { Request, Response } from "express";
import { upload, getFolder } from "../config/s3";

/**
 * POST /api/upload — Protected
 * Upload single file. Fallbacks to local disk if S3 is not configured.
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

    const file = req.file;
    const isLocal = !("location" in file);

    const folder = getFolder(req);
    const url = isLocal
      ? `http://localhost:${process.env.PORT || 5000}/uploads/${folder}/${file.filename}`
      : (file as any).location;
    const key = isLocal
      ? `${folder}/${file.filename}`
      : (file as any).key;

    res.json({
      message: "File uploaded successfully.",
      url,
      key,
      size: file.size,
      contentType: file.mimetype
    });
  });
}

/**
 * POST /api/upload/multiple — Protected
 * Upload multiple files (max 10). Fallbacks to local disk if S3 is not configured.
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

    const folder = getFolder(req);
    const filesList = (req.files as Express.Multer.File[]).map(file => {
      const isLocal = !("location" in file);
      const url = isLocal
        ? `http://localhost:${process.env.PORT || 5000}/uploads/${folder}/${file.filename}`
        : (file as any).location;
      const key = isLocal
        ? `${folder}/${file.filename}`
        : (file as any).key;

      return {
        url,
        key,
        size: file.size,
        contentType: file.mimetype
      };
    });

    res.json({
      message: `${filesList.length} file(s) uploaded successfully.`,
      files: filesList
    });
  });
}
