import * as multer from 'multer'
import { S3Client, PutObjectCommand, PutObjectCommandInput } from '@aws-sdk/client-s3'
import path from 'path'

// Configuração do cliente S3
const s3Config = new S3Client({
  region: process.env.S3_REGION,
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
  },
})

const fileFilter = (req: any, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  const extensao = path.extname(file.originalname).toLowerCase()
  const tiposAceitos = ['.png', '.jpg', '.jpeg', '.gif']

  if (tiposAceitos.includes(extensao)) {
    cb(null, true)
  } else {
    cb(null, false)
  }
}

const storage = multer.memoryStorage()
const upload = multer({
  storage,
  fileFilter,
  limits: {
    fieldNameSize: 8 * 100, 
    fileSize: 10 * 1024 * 1024,
    files: 1,
  },

})

const uploadToS3 = async (buffer: Buffer, fileName: string, mimeType: string) => {
  const bucketName = process.env.S3_BUCKET
  const region = process.env.S3_REGION

  const params: PutObjectCommandInput = {
    Bucket: bucketName,
    Key: fileName,
    Body: buffer,
    ContentType: mimeType,
    ACL: 'private',
  }
  try {
    const data = await s3Config.send(new PutObjectCommand(params))

    const url = `https://${bucketName}.s3.${region}.amazonaws.com/${fileName}`
    return url
  } catch (error) { 
    throw new Error('Erro ao enviar arquivo para o S3')
  }
}

export { upload, uploadToS3 }
