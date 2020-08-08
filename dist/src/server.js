"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
require("reflect-metadata");
var express_1 = __importDefault(require("express"));
require("express-async-errors");
var routes_1 = __importDefault(require("./routes"));
require("azure-storage");
var AppError_1 = __importDefault(require("./errors/AppError"));
require("./database");
var app = express_1.default();
app.use(express_1.default.json());
app.use(routes_1.default);
app.use(function (err, request, response, _) {
    if (err instanceof AppError_1.default) {
        return response.status(err.statusCode).json({
            status: 'error',
            message: err.message,
        });
    }
    console.error(err);
    return response.status(500).json({
        status: 'error',
        message: 'Internal server error',
    });
});
app.listen(3333, function () {
    console.log('🚀 Server started on port 3333!');
});
