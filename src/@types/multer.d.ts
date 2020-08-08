declare namespace Express {
  declare namespace Multer {
    export interface File {
      blobName: string | undefined;
    }
  }
}
