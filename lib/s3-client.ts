import { S3Client } from "@aws-sdk/client-s3";

if (!process.env.S3_ENDPOINT || !process.env.S3_REGION || !process.env.S3_ACCESS_KEY || !process.env.S3_SECRET_KEY) {
    throw new Error("Missing S3 configuration in environment variables");
}

export const s3Client = new S3Client({
    region: process.env.S3_REGION,
    endpoint: process.env.S3_ENDPOINT,
    credentials: {
        accessKeyId: process.env.S3_ACCESS_KEY,
        secretAccessKey: process.env.S3_SECRET_KEY,
    },
    forcePathStyle: true, // Required for Supabase Storage
});

export const BUCKET_NAME = process.env.S3_BUCKET_NAME || "products";
