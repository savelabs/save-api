"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var api_1 = __importDefault(require("../services/api"));
var upload_1 = __importDefault(require("../config/upload"));
var AppError_1 = __importDefault(require("../errors/AppError"));
var ensureAuthenticated_1 = __importDefault(require("../middlewares/ensureAuthenticated"));
var CreateStudentService_1 = __importDefault(require("../services/CreateStudentService"));
var UpdateAvatarStudentService_1 = __importDefault(require("../services/UpdateAvatarStudentService"));
var UpdateProfileStudentService_1 = __importDefault(require("../services/UpdateProfileStudentService"));
var ListStudentService_1 = __importDefault(require("../services/ListStudentService"));
var ListAdminStudentService_1 = __importDefault(require("../services/ListAdminStudentService"));
var studentsRouter = express_1.Router();
studentsRouter.get('/profile', ensureAuthenticated_1.default, function (request, response) { return __awaiter(void 0, void 0, void 0, function () {
    var student_id, listProfile, listprofile;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                student_id = request.student.id;
                listProfile = new ListStudentService_1.default();
                return [4 /*yield*/, listProfile.execute({
                        student_id: student_id,
                    })];
            case 1:
                listprofile = _a.sent();
                return [2 /*return*/, response.json(listprofile)];
        }
    });
}); });
studentsRouter.get('/profiles', ensureAuthenticated_1.default, function (request, response) { return __awaiter(void 0, void 0, void 0, function () {
    var student_id, listAdmin, listadmin;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                student_id = request.student.id;
                listAdmin = new ListAdminStudentService_1.default();
                return [4 /*yield*/, listAdmin.execute({
                        student_id: student_id,
                    })];
            case 1:
                listadmin = _a.sent();
                return [2 /*return*/, response.json(listadmin)];
        }
    });
}); });
studentsRouter.post('/', function (request, response) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, matricula, password;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = request.body, matricula = _a.matricula, password = _a.password;
                return [4 /*yield*/, api_1.default
                        .post('/autenticacao/token/', {
                        username: matricula,
                        password: password,
                    })
                        .catch(function (err) {
                        throw new AppError_1.default("Credenciais inv\u00E1lidas, " + err.message, 401);
                    })
                        .then(function (tokenresponse) { return __awaiter(void 0, void 0, void 0, function () {
                        var token, createStudent, student;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    token = tokenresponse.data.token;
                                    createStudent = new CreateStudentService_1.default();
                                    return [4 /*yield*/, createStudent.execute({
                                            paramMatricula: matricula,
                                            token: token,
                                        })];
                                case 1:
                                    student = _a.sent();
                                    return [2 /*return*/, response.json({ student: student, token: token })];
                            }
                        });
                    }); })];
            case 1:
                _b.sent();
                return [2 /*return*/];
        }
    });
}); });
studentsRouter.put('/avatar', ensureAuthenticated_1.default, upload_1.default.single('avatar'), function (request, response) { return __awaiter(void 0, void 0, void 0, function () {
    var updateAvatarProfile, update;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                updateAvatarProfile = new UpdateAvatarStudentService_1.default();
                return [4 /*yield*/, updateAvatarProfile.execute({
                        student_id: request.student.id,
                        blobName: request.file.blobName,
                    })];
            case 1:
                update = _a.sent();
                return [2 /*return*/, response.json(update)];
        }
    });
}); });
studentsRouter.put('/profile', ensureAuthenticated_1.default, function (request, response) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, email, turma, updateProfile, profile;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = request.body, email = _a.email, turma = _a.turma;
                updateProfile = new UpdateProfileStudentService_1.default();
                return [4 /*yield*/, updateProfile.execute({
                        student_id: request.student.id,
                        email: email,
                        turma: turma,
                    })];
            case 1:
                profile = _b.sent();
                return [2 /*return*/, response.json(profile)];
        }
    });
}); });
exports.default = studentsRouter;
