"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = __importDefault(require("axios"));
var SuapApi = axios_1.default.create({
    baseURL: 'https://suap.ifrn.edu.br/api/v2',
});
exports.default = SuapApi;
