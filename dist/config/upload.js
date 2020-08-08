"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _multer = _interopRequireDefault(require("multer"));

var _multerAzureBlobStorage = require("multer-azure-blob-storage");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const azureStorage = new _multerAzureBlobStorage.MulterAzureStorage({
  connectionString: process.env.AZURE_STORAGE_CONNECTION_STRING,
  accessKey: process.env.AZURE_STORAGE_ACCESS_KEY,
  accountName: process.env.AZURE_STORAGE_ACCOUNT,
  containerName: 'avatar',
  containerAccessLevel: 'blob'
});
const uploadAzure = (0, _multer.default)({
  storage: azureStorage
});
var _default = uploadAzure;
exports.default = _default;