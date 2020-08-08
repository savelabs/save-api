"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var multer_1 = __importDefault(require("multer"));
var multer_azure_blob_storage_1 = require("multer-azure-blob-storage");
var azureStorage = new multer_azure_blob_storage_1.MulterAzureStorage({
    connectionString: process.env.AZURE_STORAGE_CONNECTION_STRING,
    accessKey: process.env.AZURE_STORAGE_ACCESS_KEY,
    accountName: process.env.AZURE_STORAGE_ACCOUNT,
    containerName: process.env.CONTAINER_NAME,
    containerAccessLevel: 'blob',
});
var uploadAzure = multer_1.default({ storage: azureStorage });
exports.default = uploadAzure;
