import multer from 'multer';
import { MulterAzureStorage } from 'multer-azure-blob-storage';

const azureStorage: MulterAzureStorage = new MulterAzureStorage({
  connectionString: process.env.AZURE_STORAGE_CONNECTION_STRING,
  accessKey: process.env.AZURE_STORAGE_ACCESS_KEY,
  accountName: process.env.AZURE_STORAGE_ACCOUNT,
  containerName: 'avatar',
  containerAccessLevel: 'blob',
});

const uploadAzure = multer({ storage: azureStorage });

export default uploadAzure;
