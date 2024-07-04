// src/services/s3.service.ts
import { Injectable } from '@nestjs/common';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import * as crypto from 'node:crypto';

@Injectable()
export class S3Service {
  private readonly s3Client: S3Client;
  private readonly bucketName = process.env.S3_BUCKET_NAME;

  constructor() {
    this.s3Client = new S3Client({ region: process.env.AWS_REGION });
  }

  async uploadFile(file: Express.Multer.File): Promise<string> {
    const key = `${crypto.randomUUID()}-${file.originalname}`;

    const uploadParams = {
      Bucket: this.bucketName,
      Key: key,
      Body: file.buffer,
      ContentType: file.mimetype,
    };

    try {
      await this.s3Client.send(new PutObjectCommand(uploadParams));
      return key;
    } catch (error) {
      throw new Error(`Error uploading file: ${error.message}`);
    }
  }
}
