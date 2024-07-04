import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import * as multer from 'multer'

const storage = multer.memoryStorage()
const upload = multer({ storage }).single("file")

@Injectable()
export default class FileUploadMiddleware implements NestMiddleware{
  use(req: Request, res: Response, next: NextFunction) {
    upload(req, res, function (err) {
      if (err) {
        return res.status(400).send('Error uploading file');
      }
      next();
    })
  }
}