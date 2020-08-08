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
var AppError_1 = __importDefault(require("../errors/AppError"));
var UpdateStudentService = /** @class */ (function () {
    function UpdateStudentService() {
    }
    UpdateStudentService.prototype.execute = function (_a) {
        var token = _a.token, paramMatricula = _a.paramMatricula;
        return __awaiter(this, void 0, void 0, function () {
            var studentsRepository, response, _b, nomeUsual, matricula, tipoVinculo, cpf, dataDeNascimento, emailSuap, _c, nomeCompleto, curso, campus, situacao, student, studentUpdated, _d;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        studentsRepository = typeorm_1.getRepository(Student_1.default);
                        _e.label = 1;
                    case 1:
                        _e.trys.push([1, 5, , 6]);
                        return [4 /*yield*/, api_1.default.get('/minhas-informacoes/meus-dados/', {
                                headers: { Authorization: "JWT " + token },
                            })];
                    case 2:
                        response = _e.sent();
                        _b = response.data, nomeUsual = _b.nome_usual, matricula = _b.matricula, tipoVinculo = _b.tipo_vinculo, cpf = _b.cpf, dataDeNascimento = _b.data_nascimento, emailSuap = _b.email;
                        _c = response.data.vinculo, nomeCompleto = _c.nome, curso = _c.curso, campus = _c.campus, situacao = _c.situacao;
                        if (matricula !== paramMatricula) {
                            throw new AppError_1.default('Matriculas diferentes', 401);
                        }
                        return [4 /*yield*/, studentsRepository.findOne({
                                where: { matricula: matricula },
                            })];
                    case 3:
                        student = _e.sent();
                        if (!student) {
                            throw new AppError_1.default('Estudante não existe');
                        }
                        student.nomeUsual = nomeUsual;
                        student.tipoVinculo = tipoVinculo;
                        student.cpf = cpf;
                        student.situacao = situacao;
                        student.dataDeNascimento = dataDeNascimento;
                        student.emailSuap = emailSuap;
                        student.nomeCompleto = nomeCompleto;
                        student.curso = curso;
                        student.campus = campus;
                        return [4 /*yield*/, studentsRepository.save(student)];
                    case 4:
                        studentUpdated = _e.sent();
                        return [2 /*return*/, studentUpdated];
                    case 5:
                        _d = _e.sent();
                        throw new AppError_1.default('Token inválido', 401);
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    return UpdateStudentService;
}());
exports.default = UpdateStudentService;
