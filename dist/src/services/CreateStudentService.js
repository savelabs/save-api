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
var typeorm_1 = require("typeorm");
var api_1 = __importDefault(require("./api"));
var Student_1 = __importDefault(require("../models/Student"));
var UpdateStudentService_1 = __importDefault(require("./UpdateStudentService"));
var AppError_1 = __importDefault(require("../errors/AppError"));
var CreateStudentService = /** @class */ (function () {
    function CreateStudentService() {
    }
    CreateStudentService.prototype.execute = function (_a) {
        var token = _a.token, paramMatricula = _a.paramMatricula;
        return __awaiter(this, void 0, void 0, function () {
            var studentsRepository, verifyStudentExists, updateStudent, updated, response, _b, id, nomeUsual, matricula, tipoVinculo, cpf, dataDeNascimento, emailSuap, avatarSuap, _c, nomeCompleto, curso, campus, situacao, student, _d;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        studentsRepository = typeorm_1.getRepository(Student_1.default);
                        return [4 /*yield*/, studentsRepository.findOne({
                                where: { matricula: paramMatricula },
                            })];
                    case 1:
                        verifyStudentExists = _e.sent();
                        if (!verifyStudentExists) return [3 /*break*/, 3];
                        updateStudent = new UpdateStudentService_1.default();
                        return [4 /*yield*/, updateStudent.execute({
                                paramMatricula: paramMatricula,
                                token: token,
                            })];
                    case 2:
                        updated = _e.sent();
                        return [2 /*return*/, updated];
                    case 3:
                        _e.trys.push([3, 6, , 7]);
                        return [4 /*yield*/, api_1.default.get('/minhas-informacoes/meus-dados/', {
                                headers: { Authorization: "JWT " + token },
                            })];
                    case 4:
                        response = _e.sent();
                        _b = response.data, id = _b.id, nomeUsual = _b.nome_usual, matricula = _b.matricula, tipoVinculo = _b.tipo_vinculo, cpf = _b.cpf, dataDeNascimento = _b.data_nascimento, emailSuap = _b.email, avatarSuap = _b.url_foto_150x200;
                        _c = response.data.vinculo, nomeCompleto = _c.nome, curso = _c.curso, campus = _c.campus, situacao = _c.situacao;
                        if (matricula !== paramMatricula) {
                            throw new AppError_1.default('Matriculas diferentes');
                        }
                        student = studentsRepository.create({
                            admin: false,
                            id: id,
                            matricula: matricula,
                            nomeUsual: nomeUsual,
                            tipoVinculo: tipoVinculo,
                            cpf: cpf,
                            situacao: situacao,
                            dataDeNascimento: dataDeNascimento,
                            emailSuap: emailSuap,
                            avatarSuap: avatarSuap,
                            nomeCompleto: nomeCompleto,
                            curso: curso,
                            campus: campus,
                        });
                        return [4 /*yield*/, studentsRepository.save(student)];
                    case 5:
                        _e.sent();
                        return [2 /*return*/, student];
                    case 6:
                        _d = _e.sent();
                        throw new AppError_1.default('Token inválido', 401);
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    return CreateStudentService;
}());
exports.default = CreateStudentService;
