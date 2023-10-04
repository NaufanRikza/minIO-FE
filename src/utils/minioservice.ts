import * as Minio from "minio";
import { Buffer } from "buffer";
import { v4 as uuidv4 } from "uuid";

const minioClient = new Minio.Client({
  endPoint: "103.150.93.30",
  port: 9000,
  useSSL: false,
  accessKey: "!NaufanRikzaMinIO99",
  secretKey: "W£Bn1:26;0",
});

export const uploadFile = async (file: File) => {
  try {
    if (!file) {
      throw new Error("No file provided");
    }

    const buffer = (await readFileAsBuffer(file)) as string;
    const readableStream = Buffer.from(buffer);
    const bucketName = "passify.io"; // Replace with your bucket name
    const objectName = `${uuidv4()}-${file.name}`; // Use the original file name as the object name
    await minioClient.putObject(
      bucketName,
      objectName,
      readableStream,
      buffer?.length
    );
    console.info(
      `File ${objectName} uploaded successfully to bucket ${bucketName}`
    );
    return `http://103.150.93.30:9000/${bucketName}/${objectName}`;
  } catch (error) {
    console.error("Error uploading file:", error);
  }
};

export function readFileAsBuffer(
  file: File
): Promise<string | ArrayBuffer | null | undefined> {
  return new Promise((resolve, reject) => {
    if (!file) {
      reject(new Error("No file provided"));
      return;
    }

    const reader = new FileReader();

    reader.onload = function (e) {
      const buffer = e?.target?.result; // The file content as a buffer
      resolve(buffer);
    };

    reader.onerror = function () {
      reject(new Error("Error reading the file"));
    };

    reader.readAsArrayBuffer(file); // Read the file as an ArrayBuffer
  });
}
